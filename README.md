# 📱 PostGenie - Social Scheduler

### Automate Your Social Presence. Powered by AI.

A modern, full-stack social media automation platform built with **React**, **Node.js**, **Express**, **MongoDB**, **JWT Authentication**, **OpenAI API**, and **Tailwind CSS**.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-4-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Authentication-JWT-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8?logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/AI-OpenAI%20API-black?logo=openai)
![Zernio](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_97jSlCB9leNYVqy1P_9miXiKmQKwiPRII7VmHZnYyA&s)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📖 Overview

**PostGenie** is an AI-powered social media automation platform designed to simplify content creation and publishing for individuals, freelancers, and small businesses. Instead of logging into multiple social apps and writing content separately for each one, users can connect their accounts, generate post captions using AI, and schedule posts to be published automatically — all from a single unified dashboard.

The platform focuses on saving time, reducing the mental effort of daily content creation, and providing a scalable, secure MERN-stack architecture that mirrors real-world SaaS scheduling tools like Buffer and Hootsuite.

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login/signup with hashed passwords (bcrypt)
- 🔗 **Multi-Account Connection** — Link multiple social media accounts to a single dashboard
- 🤖 **AI Content Generation** — Generate captions, hashtags, and post ideas using the OpenAI API
- 🗓️ **Post Scheduling** — Pick a date/time and platform(s) to auto-publish content
- ⚙️ **Automated Publishing** — Background cron jobs publish scheduled posts without manual action
- 📊 **Dashboard & Post History** — View scheduled, published, and failed posts at a glance
- 📱 **Responsive UI** — Fully responsive design built with Tailwind CSS
- 🛡️ **Protected Routes** — Role-based, token-verified API endpoints
- 🌙 **Clean, Modern Interface** — Minimal dashboard UX for fast navigation

---

## 🧩 Modules

| Module | Description |
|---|---|
| **Authentication Module** | Handles user signup, login, JWT issuing/verification, and password encryption |
| **Account Connection Module** | Connects and stores linked social media account tokens/details |
| **AI Content Generator Module** | Sends prompts to OpenAI API and returns AI-generated captions/content |
| **Post Scheduler Module** | Creates, stores, and manages scheduled posts with target date/time and platforms |
| **Auto-Publish Module** | Cron-based background job that checks and publishes due posts |
| **Dashboard Module** | Displays connected accounts, upcoming posts, and post status |
| **Analytics Module (optional)** | Basic post performance / activity overview |

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt.js
- node-cron (scheduled publishing)

**Database**
- MongoDB
- Mongoose ODM

**External APIs**
- OpenAI API (AI content generation)
- Social Media Platform APIs (Zernio for publishing)

**Dev Tools**
- dotenv
- nodemon
- MongoDB Atlas (cloud database)
- Postman (API testing)

---

## 📁 Folder Structure

```
postgenie-social-scheduler/
│
├── client/                        # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ConnectAccounts.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   └── PostHistory.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/                        # Node + Express Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── accountController.js
│   │   └── aiController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── ConnectedAccount.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── accountRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── jobs/
│   │   └── scheduler.js           # node-cron auto-publish logic
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔄 Application Workflow

1. **User Signup/Login** → User registers or logs in → backend issues a JWT → token stored on client.
2. **Connect Social Accounts** → User links their social media accounts from the dashboard → account details saved in MongoDB.
3. **Create Post** → User writes a topic/prompt → optionally clicks "Generate with AI" → request sent to OpenAI API → AI-generated caption returned and shown in the editor.
4. **Schedule Post** → User selects target platform(s) and date/time → post saved in MongoDB with status `scheduled`.
5. **Auto-Publish Job** → A `node-cron` job runs at regular intervals, checks for posts due at the current time, and publishes them via the respective social platform API → status updated to `published` or `failed`.
6. **Dashboard View** → User can view all posts (scheduled/published/failed) and connected accounts in one place.

```
Signup/Login → Connect Accounts → Create Post → (AI Generate Content) → Schedule Post → Cron Auto-Publish → Dashboard Update
```

---

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key
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
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=http://localhost:5173
```

Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file inside the `client` folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser 🎉

---

## 🔑 .env Variables Guide

| Variable | Location | Description |
|---|---|---|
| `PORT` | server | Port on which the Express server runs |
| `MONGO_URI` | server | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | server | Secret key used to sign JWT tokens |
| `OPENAI_API_KEY` | server | API key for OpenAI content generation |
| `CLIENT_URL` | server | Frontend URL, used for CORS configuration |
| `VITE_API_BASE_URL` | client | Base URL of the backend API used by the frontend |

> ⚠️ Never commit your `.env` files to GitHub. Make sure both `client/.env` and `server/.env` are listed in `.gitignore`.

---

## 🚀 Future Enhancements
- Direct OAuth integration with Instagram, LinkedIn, and X (Twitter) APIs
- Post performance analytics dashboard
- AI image generation for posts
- Team/multi-user workspace support
- Notification system for publish success/failure

---

## 🙋 Author
Built as a MERN Stack Mini Project — combining full-stack development with AI-powered automation.
