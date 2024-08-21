# Pensieve

Pensieve is a full-stack blogging application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete blog posts, with the feature of AI-generated content powered by the Gemini API. The application features user authentication using Firebase (including Google Sign-In), rich text editing with React-Quill, responsive design powered by Tailwind CSS, and image uploads managed by Cloudinary and Multer.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Features

- **User Authentication**: Secure authentication using Firebase, including email/password and Google Sign-In options.
- **AI-Generated Content**: Create blog posts using the Gemini API for AI-generated content or manually type your posts.
- **Create, Read, Update, Delete (CRUD)**: Users can create new blog posts, read existing posts, update their posts, and delete posts they no longer want.
- **Rich Text Editing**: Compose and format blog posts using the React-Quill editor.
- **Image Uploads**: Upload and manage blog post header images using Multer and Cloudinary.
- **User Profiles**: Each user has a profile page displaying their information and posts.
- **Responsive Design**: Mobile-first design implemented with Tailwind CSS for a seamless experience across devices.
- **Lazy Loading**: Components are lazy-loaded to improve performance and reduce initial load time.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js (v18 or later)
- **npm or Yarn**: Install npm or Yarn package manager
- **MongoDB**: Set up a MongoDB database (You can use MongoDB Atlas for a cloud-based solution)
- **Firebase Account**: Create a Firebase project for authentication
- **Gemini API Access**: Obtain an API key to use Gemini for AI content generation
- **Cloudinary Account**: Create a Cloudinary account to manage image uploads

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/shashankaz/Pensieve.git
cd Pensieve
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in both the `server` and `client` directories and add the necessary environment variables as described in the [Environment Variables](#environment-variables) section.

### 4. Start the development servers

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

Open a new terminal window and run:

```bash
cd client
npm run dev
```

The application should now be running at `http://localhost:5173`.

## Environment Variables

### Backend (.env)

Create a `.env` file in the `server` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)

Create a `.env` file in the `client` directory and add the following:

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
VITE_BACKEND_URL=http://localhost:3000/api/
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Obtain these credentials from your Firebase project settings.

## Usage

1. **Register or Sign In**: Create a new account or sign in using your email/password or Google account.
2. **Create a Post**: Navigate to the "Create" page to compose a new blog post using the rich text editor, generate content using the Gemini AI, and upload a header image.
3. **View Posts**: Browse all posts on the feed or view individual posts.
4. **Edit/Delete Posts**: Edit or delete your own posts from your profile.
5. **Edit Profile**: Update your profile information.

## API Endpoints

### Base URL

```
http://localhost:5000/api/posts
```

### Endpoints

| Method | Endpoint                       | Description                                       |
| ------ | ------------------------------ | ------------------------------------------------- |
| GET    | `/`                            | Get all posts                                     |
| GET    | `/:id`                         | Get a single post by ID                           |
| GET    | `/user/:userId`                | Get all posts by a specific user                  |
| POST   | `/`                            | Create a new post                                 |
| PUT    | `/:id`                         | Update a post by ID                               |
| DELETE | `/:id`                         | Delete a post by ID                               |
| POST   | `/:id/comments`                | Add a comment to a post                           |
| POST   | `/upload`                      | Upload a header image using Multer and Cloudinary |

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **React-Quill**: Rich text editor component for React.
- **Gemini API**: AI-powered content generation API.
- **Vite**: Fast development server and build tool for modern web applications.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Cors**: Cross-Origin Resource Sharing middleware.
- **Dotenv**: Loads environment variables from a `.env` file.
- **Cloudinary**: Cloud service for managing images and videos.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
