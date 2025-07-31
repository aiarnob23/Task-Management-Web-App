# Tasco Task Management

## About Tasco

This is a **task management web application**, specifically created to **create, manage, and update your tasks**. It comes with a fun spinning wheel to add an extra, engaging way of choosing the current task.

## Features

- **User Authentication:**
- **Task Management:**
- **Responsive UI/UX:**
- **Security & Validation:**

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
- **`jsonwebtoken`** .
- **`cors`**
- **`dotenv`**

---

## Screenshots

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
