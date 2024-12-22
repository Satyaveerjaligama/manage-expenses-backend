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
    res.status(200).json({ message: "User created" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong while creating user" });
  }
};
