import express from "express";
import { validateBody } from "../utils/validateBody";
import {
  addUser,
  userExpenses,
  userGroups,
  userLogin,
} from "../controllers/user";
import { addUserValidations, userLoginValidations } from "../schemas/user";
import {
  createGroupValidations,
  joinGroupValidations,
  processJoinRequestsValidation,
  updateGroupValidations,
} from "../schemas/group";
import {
  createGroup,
  deleteGroup,
  fetchJoinRequests,
  joinGroup,
  processJoinRequests,
  updateGroup,
} from "../controllers/group";
import {
  addExpenseValidations,
  updateExpenseValidations,
} from "../schemas/expense";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../controllers/expense";

export const appRouter = express.Router();

appRouter.post("/signup", validateBody(addUserValidations), addUser);
appRouter.post(
  "/create-group",
  validateBody(createGroupValidations),
  createGroup
);
appRouter.post("/add-expense", validateBody(addExpenseValidations), addExpense);
appRouter.delete("/delete-expense/:expenseId", deleteExpense);
appRouter.delete("/delete-group/:groupId", deleteGroup);
appRouter.patch("/join-group", validateBody(joinGroupValidations), joinGroup);
appRouter.patch(
  "/process-join-request",
  validateBody(processJoinRequestsValidation),
  processJoinRequests
);
appRouter.get("/fetch-join-requests/:groupId", fetchJoinRequests);
appRouter.patch(
  "/update-expense/:expenseId",
  validateBody(updateExpenseValidations),
  updateExpense
);
appRouter.patch(
  "/update-group/:groupId",
  validateBody(updateGroupValidations),
  updateGroup
);
appRouter.post("/login", validateBody(userLoginValidations), userLogin);
appRouter.get("/user-expenses/:userId", userExpenses);
appRouter.get("/user-groups/:userId", userGroups);
