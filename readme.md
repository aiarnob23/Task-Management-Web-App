# Tasco Task Management

## About Tasco

This is a **task management web application**, specifically created to **create, manage, and update your tasks**. It comes with a fun spinning wheel to add an extra, engaging way of choosing the current task.

## Features

- **User Authentication**
- **Task Management**
- **Responsive UI/UX**
- **Security & Validation**

---

## Technologies Used

### Frontend

- **React.js**
- **TypeScript**
- **React Router DOM**
- **React Hook Form**
- **React Datepicker**
- **`lucide-react`**
- **SCSS (Sass)**
- **Tailwind CSS**
- **`js-cookie`**
- **`axios`**
- **Context API:**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **`bcryptjs`**
- **`jsonwebtoken`** 
- **`cors`**
- **`dotenv`**

---

## Screenshots
![Image](https://github.com/user-attachments/assets/f95e46fe-c25f-44f2-bd5b-c994cea4279a)

![Image](https://github.com/user-attachments/assets/62238f02-4723-46b3-85fd-a99bdb9f6bcb)

![Image](https://github.com/user-attachments/assets/a63c337e-c6ff-48a8-9e71-fb1d62945d69)

![Image](https://github.com/user-attachments/assets/1ebff055-2ef6-408b-8f55-267362556785)

![Image](https://github.com/user-attachments/assets/af05afa2-4850-435a-8643-c1df5032fb1e)

![Image](https://github.com/user-attachments/assets/810215dc-5454-4189-9bb0-7a59bdd5b2c3)

![Image](https://github.com/user-attachments/assets/28a835d7-67ac-46a3-8025-6ad84ea94bb9)

![Image](https://github.com/user-attachments/assets/cc0f10cd-926a-4d74-b657-715020008ba8)
---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or Yarn
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <https://github.com/aiarnob23/Task-Management-Web-App.git>
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create `.env` file:**
    In the `backend` directory, create a `.env` file and add your environment variables:

    ```env
    MONGODB_URI="your_mongodb_connection_string"
    JWT_SECRET="your_jwt_secret_key"
    BCRYPT_SALT_ROUNDS="your_bcrypt_salt_rounds"

    *Replace placeholders with your actual credentials.*

    ```

4.  **Run the backend:**
    ```bash
    npx nodemon # Or 'npm run dev'
    ```
    The backend server should start on `http://localhost:4000`.

---

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the frontend:**
    ```bash
    npm run dev
    ```
    The frontend application should open in your browser, typically at `http://localhost:5173` (if using Vite) or `http://localhost:3000` (if using Create React App).

---
