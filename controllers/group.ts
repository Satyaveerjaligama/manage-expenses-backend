import { Group } from "../models/group";
import { User } from "../models/user";
import { generateUserId } from "../utils/utilityFunctions";

export const createGroup = async (req: any, res: any) => {
  try {
    const adminId = req.body.adminId;
    const isValidAdmin = await User.findOne({ userId: adminId });
    if (!isValidAdmin) {
      res.status(400).json({ message: "Admin doesn't exist" });
      return;
    }

    let groupId = generateUserId("group");
    let existingGroupId = await Group.findOne({ groupId });

    while (existingGroupId) {
      groupId = generateUserId("group");
      existingGroupId = await Group.findOne({ groupId });
    }

    const group = new Group({ ...req.body, groupId });
    await group.save();
    res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong while creating the group" });
  }
};
