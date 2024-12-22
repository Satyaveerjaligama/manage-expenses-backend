import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  expenseId: {
    type: String,
    unique: true,
    required: true,
  },
  userOrGroupId: {
    type: String,
    required: true,
  },
  expenseName: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 3,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentType: String,
  date: {
    type: String,
    required: true,
  },
  addedBy: String,
});

export const Expense = mongoose.model("Expense", expenseSchema);
