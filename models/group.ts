import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    unique: true,
  },
  groupName: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 5,
  },
  adminId: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    default: [],
  },
  requests: {
    type: [String],
    default: [],
  },
});

export const Group = mongoose.model("Group", groupSchema);
