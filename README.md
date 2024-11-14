# Blogging Platform - Backend
This is the backend repository for the Blogging Platform built with Node.js, Express, and MongoDB. This API handles user authentication, CRUD operations for blog posts, and secure access using JWT tokens.

# Table of Contents
Project Overview
Technology Stack
Project Structure
Installation and Setup
Environment Variables
API Endpoints
Authentication Flow


# Project Overview
This backend project provides:

User Authentication: Register, login, and JWT-based access.
Authorization: Users can only edit or delete their own posts.
CRUD Operations: Create, read, update, and delete blog posts.
Tagging and Search: Filter posts by title or tags.
Sorting by Date: Posts sorted by creation date.

# Technology Stack
Backend: Node.js, Express.js
Database: MongoDB 
Authentication: JWT (JSON Web Tokens)
Validation: Joi for input validation
CORS: Configured to allow requests from frontend origin
Project Structure

/config
  db.js                  # Database connection setup
/middleware
  auth.js                # JWT authentication middleware
/models
  User.js                # User schema
  Post.js                # Post schema
/routes
  auth.js                # Authentication routes
  posts.js               # Blog post routes
server.js                # Server setup
.env                     # Environment variables


# Installation and Setup
Prerequisites
Ensure you have Node.js and MongoDB installed.

Steps

Clone the Repository
git clone https://github.com/ayush7078/blog-platform-backend.git
cd blog-platform-backend

Install Dependencies
npm install
Create Environment Variables File

In the root directory, create a .env file and add the following:
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
Update CORS Configuration in server.js

In server.js, update the CORS configuration to restrict requests to only http://localhost:3000 (your frontend development URL). Use the following CORS options:

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update this to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Enable for cookies or authentication headers
};


Start the Server
npm start
The server will be running at http://localhost:5000.

Environment Variables
Variable	Description
PORT	Port for the server
MONGO_URI	MongoDB connection URI
JWT_SECRET	Secret key for signing JWTs


# API Endpoints
Authentication Endpoints

1. POST /auth/register

Registers a new user.

Request Body:
{
  "username": "string",
  "email": "string",
  "password": "string"
}

2. POST /auth/login

Logs in a user and returns a JWT.

Request Body:
{
  "email": "string",
  "password": "string"
}

Response:
{
  "token": "JWT_TOKEN"
}

Blog Post Endpoints
1. GET /posts

Retrieves all posts. Available to everyone.

2. POST /posts

Creates a new post. Only authenticated users.

Headers: Authorization: Bearer JWT_TOKEN

Request Body:
{
  "title": "string",
  "content": "string",
  "tags": ["string"]
}

3. GET /posts/:id

Retrieves a post by ID. Available to everyone.

4. PUT /posts/:id

Updates a post by ID. Only the post author.

Headers: Authorization: Bearer JWT_TOKEN

Request Body:
{
  "title": "string",
  "content": "string",
  "tags": ["string"]
}

5. DELETE /posts/:id

Deletes a post by ID. Only the post author.

Headers: Authorization: Bearer JWT_TOKEN

6. GET /posts/search?query=

Searches posts by title or tags. Available to everyone.

# Authentication Flow
Register: A user registers with a username, email, and password. The password is securely hashed.
Login: The user logs in with email and password. On successful login, the server issues a JWT.
JWT Verification: The JWT token is required in the Authorization header for all routes that modify data (create, update, and delete posts).
Protected Routes: Only users with a valid JWT can access protected routes.
