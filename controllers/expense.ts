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

export const deleteExpense = async (req: any, res: any) => {
  try {
    const expenseId = req.params?.expenseId;

    const isDeleted = await Expense.findOneAndDelete({ expenseId });
    if (!isDeleted) {
      res.status(404).json({ message: "Expense doesn't exist" });
      return;
    }
    res.status(200).json({ message: "Expense deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong while deleting expense" });
  }
};

export const updateExpense = async (req: any, res: any) => {
  try {
    const expenseId = req.params?.expenseId;

    const isUpdated = await Expense.findOneAndUpdate(
      { expenseId },
      {
        $set: {
          expenseName: req.body.expenseName,
          amount: req.body.amount,
          category: req.body.category,
          paymentMethod: req.body.paymentMethod,
          date: req.body.date,
        },
      }
    );
    if (!isUpdated) {
      res.status(404).json({ message: "Expense doesn't exist" });
      return;
    }
    res.status(200).json({ message: "Expense details Updated" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong while updating expense" });
  }
};
