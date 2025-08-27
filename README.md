# Task Manager App

A full-stack Task Manager application with user authentication and task management features built using **Node.js**, **Express**, **MongoDB**, and **React.js**.

---

## Features

- User registration and login
- JWT-based authentication
- Create, update, delete, and mark tasks as completed
- Dashboard to view user tasks
- Frontend built with React.js
- Backend built with Node.js and Express
- MongoDB database for persistent storage

---

## Folder Structure

task_manager/
├── frontend/ # React frontend
├── backend/ # Node.js backend
├── app.js # Backend entry point
├── package.json # Backend dependencies
├── README.md # This file
└── .gitignore

yaml
Copy code

---

## Requirements

- Node.js >= 14.x
- npm >= 6.x
- MongoDB (local or Atlas)
- Git

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sanika394/Task_Manager_APP_1.git
cd Task_Manager_APP_1
2. Backend Setup
bash
Copy code
cd backend  # if your backend is in a separate folder, otherwise stay in root
npm install
Create a .env file in the backend folder with the following variables:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy code
node app.js
Backend should be running at http://localhost:5000.

3. Frontend Setup
bash
Copy code
cd frontend
npm install
npm start
Frontend should be running at http://localhost:3000.

API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT token

Tasks (Protected, JWT required)
Method	Endpoint	Description
GET	/api/tasks	Get all tasks for the logged-in user
POST	/api/tasks	Add a new task
PUT	/api/tasks/:id	Toggle task completion status
DELETE	/api/tasks/:id	Delete a task

Usage
Register a new user.

Login to get access to the Dashboard.

Add tasks, mark them completed, or delete them.

Logout when finished.

Notes
Make sure MongoDB is running or use a MongoDB Atlas URI.

JWT token is stored in localStorage for authentication with task APIs.

Frontend requires backend to be running on port 5000 (or adjust api.js URLs).

License
This project is licensed under the MIT License.

yaml
Copy code

---

If you want, I can also **add a “Requirements.txt” style section listing all npm packages for backend and frontend** so anyone cloning your repo can just install them easily.  

Do you want me to add that too?
