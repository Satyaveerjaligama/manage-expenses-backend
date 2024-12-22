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

export const updateGroup = async (req: any, res: any) => {
  try {
    const groupId = req.params?.groupId;

    const isUpdated = await Group.findOneAndUpdate(
      { groupId },
      {
        $set: {
          groupName: req.body.groupName,
        },
      }
    );
    if (!isUpdated) {
      res.status(404).json({ message: "Group doesn't exist" });
      return;
    }
    res.status(200).json({ message: "Group details Updated" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong while updating group" });
  }
};

export const deleteGroup = async (req: any, res: any) => {
  try {
    const groupId = req.params?.groupId;

    const isDeleted = await Group.findOneAndDelete({ groupId });
    if (!isDeleted) {
      res.status(404).json({ message: "Group doesn't exist" });
      return;
    }
    res.status(200).json({ message: "Group deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong while deleting group" });
  }
};
