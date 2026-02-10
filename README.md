# AI-Driven Learning Platform

## Overview
An AI-powered learning platform that allows users to select categories and sub-categories of topics, send prompts to an AI to generate lessons, and view their learning history. The system includes a REST API backend, a database, AI integration, and a basic frontend dashboard.

## Technologies
- Backend: NestJS (Node.js)
- Frontend: Angular
- Database: MongoDB 
- AI Integration: Mocked OpenAI GPT (configurable via `.env`)
- Authentication: JWT

## Requirements and Local Setup
The entire project, including the Backend, Frontend, and MongoDB, can be run locally using Docker Compose. This simplifies setup and ensures all services are correctly configured and connected.
### 1. Clone the repository
```bash
git clone https://github.com/MiriamCohenDev/ai-learning-platform.git
cd ai-learning-platform
```
### 2. Configure .env files
There are two .env.example files that need to be updated:

#### 2.1 Root of the project
Update the MongoDB root credentials:
```bash
MONGO_INITDB_ROOT_USERNAME=your_username
MONGO_INITDB_ROOT_PASSWORD=your_password
```
#### 2.2 Backend directory
- Configures the backend server, database connection, authentication, AI integration, and admin credentials.
```bash
# Backend server
PORT=3000

# Database
MONGO_URI=mongodb://username:password@mongo:27017/mydb?authSource=admin

# JWT authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=3600s

# AI integration
AI_MODE=mock
OPENAI_API_KEY=your_openai_api_key_here

# Admin user (for demo purposes)
ADMIN_NAME=AdminName
ADMIN_ID_NUMBER=123456789
```
##### Note:
Replace placeholders with your actual credentials and secrets. Proper configuration of these .env files is required for the project to run correctly.

### 3. Run with Docker Compose
```bash
docker-compose up --build
```
- Backend will be available at: http://localhost:3000

- Frontend will be available at: http://localhost:4200

To stop the running services, use:
```bash
docker-compose down
```

### Functionality
#### Users can:

- Create lessons by selecting a category and sub-category and submitting a prompt

- View their lesson history

#### Admin can:

- View all users

- Access each user's lesson history

Authentication is handled using JWT

### Project Structure
```bash
/backend        # NestJS backend
/frontend       # Angular frontend
/docker-compose.yml
/env.example    # Sample environment configuration
```
### AI Integration
The AI can operate in Mock or real OpenAI mode, configurable via the AI_MODE environment variable

The system includes an integration framework with OpenAI GPT; Mock mode is default to prevent costs
