import { Response } from "express";
import { Authrequest } from "../middlewares/authMiddlewware.js";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { cloudinary } from "../config/cloudinary.js";
import { Generation } from "../models/Generation.js";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";

//Generate post
//POST /api/posts/generate
export const generatePost = async (req:Authrequest, res:Response): Promise<void>=>{
    try {
        const {prompt, tone, generateImage} =req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        if(!apiKey){
            res.status(400).json({message: "Gemini API key is missing. Please add it to your server/.env file."});
            return;
        }

        const ai = new GoogleGenAI({apiKey});

        //Generate text
        const textResponse = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `Generate a social media post based on this prompt: "${prompt}".
            Tone: ${tone}.
            Include relevant hashtags.
            Format the response as JSON with "content" and "imagePrompt" fileds.
            The "imagePrompt" should be a highly descriptive prompt for an image generator that complements the post.`,
        });

        let content="";
        let imagePrompt= prompt;

        try {
            const rawText = textResponse.text || "";
            const jsonMatch= rawText.match(/\{[\s\S]*\}/);
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {content : rawText, 
            imagePrompt: prompt};
            content=data.content;
            imagePrompt = data.imagePrompt;
        } catch (e) {
            content = textResponse.text || ""
        }
        let mediaUrl = "";
        if(generateImage){
            try {
                const stabilityKey = process.env.STABILITY_API_KEY;
                if(!stabilityKey){
                    console.error("Stability AI error: STABILITY_API_KEY is missing in server environment.");
                } else {
                    const formData = new FormData();
                    formData.append("prompt", imagePrompt);
                    formData.append("output_format", "png");
                    formData.append("aspect_ratio", "1:1");
                    formData.append("mode", "text-to-image");

                    const stabilityResponse = await axios.post(
                        "https://api.stability.ai/v2beta/stable-image/generate/sd3",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${stabilityKey}`,
                                Accept: "image/*",
                            },
                            responseType: "arraybuffer",
                            timeout: 60000,
                        }
                    );

                    const imageBuffer = Buffer.from(stabilityResponse.data);

                    //Upload buffer to Cloudinary for persistence
                    const uploadResult = await new Promise<any>((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream(
                            { folder: "ai-generations" },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );
                        stream.end(imageBuffer);
                    });

                    if (uploadResult && uploadResult.secure_url) {
                        mediaUrl = uploadResult.secure_url;
                    } else {
                        console.error("Cloudinary upload failed: No secure_url returned");
                    }
                }
            } catch (err: any) {
                let errorDetails = err?.message || "Unknown error";
                if (err?.response?.data) {
                    try {
                        const rawErrData = Buffer.isBuffer(err.response.data)
                            ? err.response.data.toString("utf-8")
                            : err.response.data instanceof ArrayBuffer
                            ? Buffer.from(err.response.data).toString("utf-8")
                            : JSON.stringify(err.response.data);
                        errorDetails = `HTTP ${err.response.status}: ${rawErrData}`;
                    } catch (parseErr) {
                        errorDetails = `HTTP ${err.response.status}`;
                    }
                }
                console.error("Stability AI image generation failed:", errorDetails);
            }
        }

        //Save generation to DB
        const generation = await Generation.create({
            user: req.user._id,
            prompt,
            content,
            mediaUrl,
            mediaType: mediaUrl ? "image" : undefined,
            tone,
        })

        res.json(generation)

    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"});
    }
}


//Get Generations
//GET /api/posts/generations
export const getGenerations = async (req:Authrequest, res:Response): Promise<void>=>{
    try {
        const generations= await Generation.find({user:req.user._id}).sort({createdAt: -1})
        res.json(generations)
    } catch (error: any) {
        res.status(500).json({message: error?.message || "Server error"});
    }
}


//Get post
//GET /api/posts
export const getPosts = async (req:Authrequest, res:Response): Promise<void>=>{
    try {
        const posts = await Post.find({user: req.user._id})
        res.json(posts)
    } catch (error : any) {
        res.status(500).json({message: error?.message || "Server error"});
    }
}


//Schedule post
//POST /api/posts
export const schedulePost = async (req:Authrequest, res:Response): Promise<void>=>{
try {
    const {content, platforms, scheduledFor, status} =req.body;

    //Parse platforms if it comes as a stringifies array from FormData
    let parsedPlatforms = platforms;
    if(typeof platforms === "string"){
        try {
            parsedPlatforms= JSON.parse(platforms)
        } catch (e) {
            parsedPlatforms = platforms.split(",");
        }
    }

    let mediaUrl: string | undefined = req.body.mediaUrl;
    let mediaType: "image" | "video" | undefined = req.body.mediaType;

    if(req.file){
        const result = await new Promise<any>((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream({resource_type: "auto",
            folder: "social-scheduler"},(error, result)=>{
                if(error) reject(error);
                else resolve(result)
            });
            stream.end(req.file!.buffer);
        });
        mediaUrl= result.secure_url;
        mediaType= result.resource_type === "video" ? "video": "image";
    }
    const post = await Post.create({
        user: req.user._id,
        content,
        platforms: parsedPlatforms,
        mediaUrl,
        mediaType,
        scheduledFor,
        status,
    })
    res.status(201).json(post)
    
} catch (error: any) {
    res.status(500).json({message: error?.message || "Server error"});
}
}