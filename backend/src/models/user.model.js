import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: false,
    default:0,
  },
  tasks: {
    type: [String],
    required: false,
  },
});

export const User = model("User", userSchema);
