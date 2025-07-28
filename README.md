# 📝 Task Manager API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for user registration, login (with JWT), and task management. Tasks include title, description, due date, and priority (high, medium, low). Authentication is required for all task-related operations.

---

## 🚀 Features

-   User registration and login with **JWT-based authentication**
-   Secure password hashing using **bcryptjs**
-   Full **CRUD operations** for tasks
-   Each task includes:

    -   `title` (required)
    -   `description` (optional)
    -   `dueDate` (ISO 8601, must be in future)
    -   `priority` (`high`, `medium`, or `low`)

-   API documentation with **Swagger**
-   Modular project structure
-   Input validation using **moment**

---

## 🧑‍💻 Technologies Used

-   Node.js
-   Express
-   MongoDB + Mongoose
-   JWT (`jsonwebtoken`)
-   bcryptjs
-   moment
-   Swagger (OpenAPI)
-   dotenv
-   nodemon

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/brock002/tasks-api-nodejs.git
cd tasks-api-nodejs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your_long_random_secret_here
```

### 4. Run the server

```bash
npm run dev
```

Server runs at: [http://localhost:5000](http://localhost:5000)

---

## 📚 API Documentation

Swagger UI available at:

```
http://localhost:5000/api-docs
```

Use this for testing and exploring endpoints.

---

## 🔐 Authentication

-   Register: `POST /api/auth/register`
-   Login: `POST /api/auth/login`

Receive a JWT on login. Pass it in the `Authorization` header as:

```
Bearer <your_token_here>
```

---

## 🧾 Task Endpoints

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/api/tasks`     | Get all user tasks |
| POST   | `/api/tasks`     | Create a new task  |
| GET    | `/api/tasks/:id` | Get a task by ID   |
| PUT    | `/api/tasks/:id` | Update a task      |
| DELETE | `/api/tasks/:id` | Delete a task      |

---

## ✅ Validation Rules

-   **Title**: Required
-   **Due Date**: Must be a valid ISO 8601 date-time in the future
-   **Priority**: Must be one of `high`, `medium`, `low`

---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## ✨ Acknowledgments

-   [Express](https://expressjs.com)
-   [Mongoose](https://mongoosejs.com)
-   [Moment.js](https://momentjs.com)
-   [Swagger UI](https://swagger.io/tools/swagger-ui/)

---
