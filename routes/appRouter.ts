import express from "express";
import { validateBody } from "../utils/validateBody";
import { addUser, userExpenses, userLogin } from "../controllers/user";
import { addUserValidations, userLoginValidations } from "../schemas/user";
import { createGroupValidations } from "../schemas/group";
import { createGroup } from "../controllers/group";
import { addExpenseValidations } from "../schemas/expense";
import { addExpense, deleteExpense } from "../controllers/expense";

export const appRouter = express.Router();

appRouter.post("/signup", validateBody(addUserValidations), addUser);
appRouter.post(
  "/create-group",
  validateBody(createGroupValidations),
  createGroup
);
appRouter.post("/add-expense", validateBody(addExpenseValidations), addExpense);
appRouter.delete("/delete-expense/:expenseId", deleteExpense);
appRouter.post("/login", validateBody(userLoginValidations), userLogin);
appRouter.get("/user-expenses/:userId", userExpenses);
