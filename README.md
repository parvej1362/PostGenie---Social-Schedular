# 📱 PostGenie - Social Scheduler

### Automate Your Social Presence. Powered by AI.

A modern, full-stack social media automation platform built with **React**, **TypeScript**, **Node.js**, **Express**, **MongoDB**, **Gemini AI**, **Stability AI**, **Cloudinary**, **Zernio**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-5-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Authentication-JWT-orange)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%203.8-4285F4?logo=google)
![Stability AI](https://img.shields.io/badge/Image_AI-Stability_SD3-black)
![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-blue?logo=cloudinary)
![Zernio](https://img.shields.io/badge/Social_API-Zernio-red)

---

## 📖 Overview

**PostGenie** is an AI-powered social media automation platform designed to simplify content creation and multi-platform publishing for individuals, creators, and businesses. Instead of logging into multiple social networks and writing posts individually, users can connect their social accounts, generate engaging post captions and hashtags with Gemini AI, create high-quality social visuals with Stability AI, and schedule posts to publish automatically across platforms — all from a single unified dashboard.

The platform focuses on saving time, eliminating creative block, and providing a scalable, secure TypeScript MERN-stack architecture mirroring modern SaaS scheduling platforms like Buffer and Hootsuite.

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based authentication with bcrypt password hashing and persistent local session state.
- 🔗 **Multi-Account Connection** — Link social profiles (Twitter, LinkedIn, Facebook, Instagram) seamlessly via Zernio integration.
- 🤖 **Gemini AI Content Generator** — Generate tailored post captions, hashtags, and descriptive image prompts based on customizable tones (Professional, Creative, Funny, Minimalist, Excited).
- 🎨 **Stability AI Visual Generation** — Generate high-resolution social media images on-demand using Stability AI Stable Image Core API (`sd3`).
- ☁️ **Cloudinary Media Persistence** — Automatically upload and host generated and uploaded post images and videos on Cloudinary CDN.
- 🗓️ **Post Scheduling** — Select target social channels, date, and time to schedule posts for automated publishing.
- ⚙️ **Automated Background Publishing** — A `node-cron` background service continuously monitors due posts and publishes them directly to connected accounts.
- 📊 **Dashboard & Generation History** — Review past AI generations, scheduled posts, and connected channel statuses.
- 📱 **Responsive & Modern UI** — Clean, responsive user interface built with Tailwind CSS, Lucide icons, and React Hot Toast.

---

## 🧩 Modules

| Module | Description |
|---|---|
| **Authentication Module** | Handles user registration, login, JWT issuance/verification, and password encryption |
| **Account Connection Module** | Integrates Zernio OAuth flow to link and synchronize social media accounts |
| **AI Content Generator Module** | Sends prompts to Gemini AI (`@google/genai`) to return formatted post content and image prompts |
| **AI Image Generator Module** | Uses Stability AI REST API to generate binary images and streams them to Cloudinary |
| **Media Upload & Storage Module** | Manages Cloudinary image stream uploads for both AI images and user-uploaded media |
| **Post Scheduler Module** | Stores scheduled post records in MongoDB with target platforms, media URLs, and date/time |
| **Auto-Publish Module** | Background cron service (`schedulerService`) that publishes due posts to Zernio |
| **Dashboard & History Module** | Displays connected accounts, post scheduling status, and recent AI post history |

---

## 🛠️ Tech Stack

**Frontend**
- React.js 19 (Vite)
- TypeScript
- React Router DOM
- Tailwind CSS
- Lucide React (Icons)
- Axios
- React Hot Toast

**Backend**
- Node.js
- Express.js (v5)
- TypeScript (tsx runtime)
- JWT (jsonwebtoken)
- bcrypt
- node-cron (scheduled publishing)
- Multer (form data & file upload handling)

**Database**
- MongoDB Atlas
- Mongoose ODM

**External APIs & Services**
- **Gemini AI (`@google/genai`)**: Post text, hashtag, and image prompt generation
- **Stability AI (Stable Image Core API - SD3)**: Text-to-image AI visual generation
- **Cloudinary**: Cloud media hosting and CDN delivery
- **Zernio API (`@zernio/node`)**: Social account management and multi-platform publishing

**Dev Tools**
- dotenv
- tsx (TypeScript execution)
- MongoDB Atlas (Cloud database)

---

## 📁 Folder Structure

```
PostGenie---Social-Schedular/
│
├── client/                        # React + TypeScript Frontend
│   ├── public/
│   │   ├── logo.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.ts           # Axios instance with base URL & interceptors
│   │   ├── assets/
│   │   │   └── assets.ts          # Platforms config, icons, and mock data
│   │   ├── components/
│   │   │   ├── Home/              # Landing page sections
│   │   │   ├── AccountList.tsx
│   │   │   ├── Layout.tsx         # Main application layout wrapper
│   │   │   ├── PlatformPickerModal.tsx
│   │   │   └── Sidebar.tsx        # App navigation sidebar & user profile
│   │   ├── context/
│   │   │   └── AuthContext.tsx    # Global auth state & user session provider
│   │   ├── pages/
│   │   │   ├── Accounts.tsx       # Social channel connection manager
│   │   │   ├── AIComposer.tsx     # AI prompt composer & image generator
│   │   │   ├── Dashboard.tsx      # Unified analytics & post summary
│   │   │   ├── Home.tsx           # Public landing page
│   │   │   ├── Login.tsx          # Login / Register page
│   │   │   └── Scheduler.tsx      # Scheduled posts calendar & status view
│   │   ├── App.tsx                # Client routing & protected routes
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                        # Node + Express + TypeScript Backend
│   ├── config/
│   │   ├── cloudinary.ts          # Cloudinary SDK configuration
│   │   ├── db.ts                  # MongoDB connection setup
│   │   ├── multer.ts              # Multer memory storage configuration
│   │   └── zernio.ts              # Zernio SDK client initialization
│   ├── controllers/
│   │   ├── accountControllers.ts  # Connected social account management
│   │   ├── activityController.ts   # User activity log controller
│   │   ├── authController.js      # User registration & login handlers
│   │   ├── postController.ts      # AI post generation & scheduling handlers
│   │   └── socialAuthController.ts# Zernio OAuth URL generation & sync
│   ├── middlewares/
│   │   └── authMiddlewware.ts     # JWT protection middleware
│   ├── models/
│   │   ├── Account.ts             # Connected social account schema
│   │   ├── Activity.ts            # User activity log schema
│   │   ├── Generation.ts          # AI generation history schema
│   │   ├── Post.ts                # Scheduled post schema
│   │   └── User.ts                # User profile schema
│   ├── routes/
│   │   ├── accountRoutes.ts
│   │   ├── activityRoutes.ts
│   │   ├── authRoutes.ts
│   │   ├── postRoutes.ts
│   │   └── socialAuthRoutes.ts
│   ├── services/
│   │   └── schedulerService.ts    # node-cron auto-publishing service
│   ├── server.ts                  # Server entry point & Express app setup
│   ├── tsconfig.json
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Workflow

1. **User Signup/Login** → User registers or logs in → Backend issues a JWT → Auth state & user object stored in `localStorage` and `AuthContext`.
2. **Connect Social Accounts** → User initiates OAuth via Zernio from the Accounts page → Connected accounts (Twitter, LinkedIn, Facebook, Instagram) synced to MongoDB.
3. **AI Post Composition** → User enters a topic/prompt in the AI Composer and selects a tone → Request sent to Gemini AI API (`@google/genai`) → Gemini returns formatted post content and a descriptive image prompt.
4. **AI Image Generation & CDN Upload** → If "AI Image" is enabled, backend sends the image prompt to Stability AI Stable Image Core REST API (`sd3`) → Returned binary PNG image buffer uploaded directly to Cloudinary CDN → CDN URL attached to the generation record.
5. **Schedule Post** → User opens the schedule modal, chooses target social channels, date, and time → Post saved in MongoDB with status `scheduled`.
6. **Auto-Publish Job** → `schedulerService` (powered by `node-cron`) runs in the background, checks for posts due at the current time, and publishes them to connected channels via Zernio API → Post status updated to `published` or `failed`.
7. **Dashboard View** → User monitors connected accounts, recent AI generations, and upcoming scheduled posts from the dashboard.

```
Signup/Login → Connect Accounts (Zernio) → AI Composer (Gemini AI Text + Stability AI Image) → Cloudinary CDN Upload → Schedule Post → Cron Auto-Publish → Dashboard Update
```

---

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- Gemini API key
- Stability AI API key
- Cloudinary account credentials
- Zernio API key
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/postgenie-social-scheduler.git
cd postgenie-social-scheduler
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
STABILITY_API_KEY=your_stability_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ZERNIO_API_KEY=your_zernio_api_key
```

Run the backend server:
```bash
npm run server
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file inside the `client` folder (if custom API URL configuration is required):
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Run the frontend dev server:
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser 🎉

---

## 🔑 .env Variables Guide

| Variable | Location | Description |
|---|---|---|
| `PORT` | server | Port on which the Express server runs (default: 3000) |
| `MONGODB_URI` | server | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | server | Secret key used to sign and verify JWT tokens |
| `GEMINI_API_KEY` | server | API key for Gemini AI content and prompt generation |
| `STABILITY_API_KEY` | server | API key for Stability AI Stable Image Core (`sd3`) image generation |
| `CLOUDINARY_CLOUD_NAME` | server | Cloudinary cloud name for media storage |
| `CLOUDINARY_API_KEY` | server | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | server | Cloudinary API secret |
| `ZERNIO_API_KEY` | server | API key for Zernio social media integration & publishing |
| `VITE_API_BASE_URL` | client | Base URL of the backend API used by the frontend Axios client |

> ⚠️ Never commit your `.env` files to GitHub. Make sure both `client/.env` and `server/.env` are listed in `.gitignore`.

---

## 🚀 Future Enhancements

- Post performance and engagement analytics dashboard
- Bulk post scheduling via CSV / Excel upload
- Advanced image editing & canvas options before publishing
- Team workspace & multi-user role management
- Email & webhook notifications for publishing status

---

## 🙋 Author

Built as a MERN Stack + TypeScript Project — combining full-stack development with multi-modal AI automation.
