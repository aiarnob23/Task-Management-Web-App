import AppError from "../error/appError.js";
import mongoose from "mongoose";

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorName = err.name || "Error";

  if (err instanceof AppError && err.isOperational) {
    //
  }
  // MongoDB duplicate key errors (code 11000)
  else if (err.code === 11000) {
    statusCode = 409;
    errorName = "Conflict";
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for "${field}": "${err.keyValue[field]}"`;
  }
  //Mongoose validation errors
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    errorName = "ValidationError";
    const errors = Object.values(err.errors).map((e) => e.message);
    message = `Validation error: ${errors.join(", ")}`;
  }
  //Mongoose CastError
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    errorName = "BadRequest";
    message = `Invalid ${err.path}: "${err.value}"`;
  }
  //other unexpected errors
  else {
    console.error("🚨 Unexpected Error:", err);
      message = "Internal Server Error";
  }

  //standardized JSON error response
  res.status(statusCode).json({
    success: false,
    statusCode,
    error: errorName,
    message,
    stack: err.stack ,
  });
};

export default globalErrorHandler;
