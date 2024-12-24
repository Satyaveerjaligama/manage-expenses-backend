import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 5,
  },
  emailOrPhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 20,
    minLength: 8,
  },
  groups: {
    type: [String],
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
