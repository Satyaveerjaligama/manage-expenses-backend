import { Expense } from "../models/expense";
import { User } from "../models/user";
import { generateUserId } from "../utils/utilityFunctions";

export const addUser = async (req: any, res: any) => {
  try {
    const emailOrPhoneNumber = req.body.emailOrPhoneNumber;
    const isExisting = await User.findOne({ emailOrPhoneNumber });
    if (isExisting) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    let userId = generateUserId("user");
    let existingUser = await User.findOne({ userId });
    while (existingUser) {
      userId = generateUserId("user");
      existingUser = await User.findOne({ userId });
    }

    const user = new User({ ...req.body, userId });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong while creating user" });
  }
};

export const userLogin = async (req: any, res: any) => {
  try {
    const { emailOrPhoneNumber, password } = req.body;
    const isValidUser = await User.findOne({ emailOrPhoneNumber, password });
    if (!isValidUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User found", userId: isValidUser.userId });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong while logging in user" });
  }
};

export const userExpenses = async (req: any, res: any) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(400).json({ message: "Missing User id" });
      return;
    }
    const expenses = await Expense.find(
      { userOrGroupId: userId },
      { _id: 0, __v: 0 }
    );
    res.status(200).json({ expenses });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong while logging in user" });
  }
};
