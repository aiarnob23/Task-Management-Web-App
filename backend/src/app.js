import cors from "cors";
import express from "express";
import { userRoutes } from "./routes/user.routes.js";
import { taskRoutes } from "./routes/task.routes.js";
import helmet from "helmet";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

//cors and middlewares
const app = express();
app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: [
      "https://task-management-web-app-pink.vercel.app",
      "http://localhost:5173",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);
app.get("/", (req, res) => {
  res.send("Task Management Web Application Server");
});
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found`,
    error: {
      code: "NOT_FOUND",
      details: "The requested URL does not exist on this server.",
    },
  });
});

app.use(globalErrorHandler);

export default app;
