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

export const joinGroup = async (req: any, res: any) => {
  try {
    const { userId, groupId } = req.body;
    const userInDb = await User.findOne({ userId });
    if (!userInDb) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const groupInDb = await Group.findOne({ groupId });
    if (!groupInDb) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    if (
      groupInDb.members.includes(userId) ||
      groupInDb.requests.includes(userId) ||
      groupInDb.adminId === userId
    ) {
      res.status(409).json({
        message:
          "User either already in the group or approval from admin is pending",
      });
      return;
    }

    groupInDb.requests.push(userId);

    const updateGroup = await Group.findOneAndUpdate(
      { groupId },
      {
        $set: {
          requests: groupInDb.requests,
        },
      }
    );

    if (!updateGroup) {
      req.status(500).json({ message: "User join request failed" });
      return;
    }
    res.status(200).json({ message: "Join request sent" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong while joining the group" });
  }
};

export const processJoinRequests = async (req: any, res: any) => {
  try {
    const { action, groupId, userId } = req.body;
    const userInDb = await User.findOne({ userId });
    if (!userInDb) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const groupInDb = await Group.findOne({ groupId });
    if (!groupInDb) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    if (action === "delete") {
      const index = groupInDb.requests.indexOf(userId);
      if (index !== -1) {
        groupInDb.requests.splice(index, 1);
        const updateGroup = await Group.findOneAndUpdate(
          { groupId },
          {
            $set: {
              requests: groupInDb.requests,
            },
          }
        );

        if (!updateGroup) {
          req.status(500).json({ message: "Something failed" });
          return;
        }
        res.status(200).json({ message: "Request Rejected" });
        return;
      }
      res.status(404).json({ message: "User Request Not found" });
    } else if (action === "approve") {
      const index = groupInDb.requests.indexOf(userId);
      if (index !== -1) {
        groupInDb.requests.splice(index, 1);
        groupInDb.members.push(userId);
        const updateGroup = await Group.findOneAndUpdate(
          { groupId },
          {
            $set: {
              members: groupInDb.members,
              requests: groupInDb.requests,
            },
          }
        );

        if (!updateGroup) {
          req.status(500).json({ message: "Something failed" });
          return;
        }
        res.status(200).json({ message: "Request Approved" });
        return;
      }
      res.status(404).json({ message: "User Request Not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong while processing the request" });
  }
};

export const fetchJoinRequests = async (req: any, res: any) => {
  try {
    const groupId = req.params.groupId;
    const groupData = await Group.findOne({ groupId });
    if (!groupData) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    const requests = groupData.requests;
    if (requests.length === 0) {
      res.status(404).json({ message: "No requests Found" });
      return;
    }

    const requestsWithUsers: { userId: string; userName: string }[] = [];
    for (const userId of requests) {
      const userData = await User.findOne({ userId });
      if (userData) {
        requestsWithUsers.push({
          userId: userData.userId,
          userName: userData.userName,
        });
      }
    }
    res.status(200).json({ requests: requestsWithUsers });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong while fetching join requests" });
  }
};
