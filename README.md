Nest.js API Application
This README explains how to run the Nest.js application using Docker and provides details on the authentication flow.
Running with Docker
Prerequisites

Docker and Docker Compose installed on your system
Git to clone the repository

Starting the Application

Clone the repository:

bashgit clone <repository-url>
cd <repository-directory>

Start the application using Docker Compose:

bashdocker-compose up -d
This will start the Nest.js application and any required services (database, etc.). The API will be accessible at http://localhost:3000.
API Authentication Flow
The application uses JWT authentication with a user invitation system. Below is the step-by-step flow:

1. Admin Login
   First, obtain an admin JWT token by sending a POST request to the login endpoint:
   Endpoint: POST http://localhost:3000/auth/login
   Request Body:
   json{
   "email": "admin@example.com",
   "password": "admin123"
   }
   Response:
   json{
   "access_token": "eyJhbGciOiJ............"
   }
2. Invite a User
   Using the admin token, you can invite a new user by sending a POST request:
   Endpoint: POST http://localhost:3000/invite
   Headers:
   Authorization: Bearer <admin-jwt-token>
   Request Body:
   json{
   "email": "user@example.com"
   }
   Response:
   json{
   "message": "Invite sent",
   "token": "7a44ff22-be9b-4cb7-bd9a-3900c5c3e998"
   }
3. Register the User
   The invited user can register using the invitation token:
   Endpoint: POST http://localhost:3000/register
   Request Body:
   json{
   "token": "7a44ff22-be9b-4cb7-bd9a-3900c5c3e998",
   "name": "user",
   "password": "userpassword"
   }
   Response:
   json{
   "message": "User registered successfully",
   "user": {
   "name": "user",
   "role": "contributor",
   "status": "pending_approval",
   "id": "2e766672-f186-4365-84e0-a933efb1d2a9"
   },
   "access_token": "eyJhbGciOiJ............"
   }
4. Check User Status
   You can check a user's status using either the admin token or the user's own token:
   Endpoint: GET http://localhost:3000/status/<user-id>
   Headers:
   Authorization: Bearer <jwt-token>
   Response:
   json{
   "status": "pending_approval",
   "user": {
   "id": "2e766672-f186-4365-84e0-a933efb1d2a9",
   "name": "user",
   "role": "contributor"
   }
   }
   Troubleshooting
   If you encounter any issues:

Check that Docker is running properly
Ensure all containers are up with docker-compose ps
View logs with docker-compose logs -f
Restart the application with docker-compose restart

Development
For local development without Docker, please refer to the development documentation.
