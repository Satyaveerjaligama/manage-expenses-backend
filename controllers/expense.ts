import { Expense } from "../models/expense";
import { Group } from "../models/group";
import { User } from "../models/user";
import { generateUserId } from "../utils/utilityFunctions";

export const addExpense = async (req: any, res: any) => {
  try {
    const id = req.body.userOrGroupId;
    const isValidId = req.body.isGroupExpense
      ? (await Group.findOne({ groupId: id })) &&
        (await User.findOne({ userId: req.body.addedBy }))
      : await User.findOne({ userId: id });

    if (!isValidId) {
      res.status(400).json({ message: "Invalid user or group id" });
      return;
    }

    let expenseId = generateUserId("expense");
    let existingExpense = await Expense.findOne({ expenseId });
    while (existingExpense) {
      expenseId = generateUserId("expense");
      existingExpense = await Expense.findOne({ expenseId });
    }

    const expense = new Expense({ ...req.body, expenseId });
    await expense.save();
    res.status(201).json({ message: "Created expense Successfully" });
  } catch (err: any) {
    res
      .status(400)
      .json({ message: "Something went wrong while adding expense" });
  }
};
