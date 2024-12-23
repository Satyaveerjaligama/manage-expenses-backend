import * as yup from "yup";
import { REGULAR_EXPRESSIONS } from "../utils/constants";

export const createGroupValidations = yup.object().shape({
  groupName: yup
    .string()
    .matches(
      REGULAR_EXPRESSIONS.LETTERS_AND_NUMBERS,
      "Only letters and numbers are allowed"
    )
    .max(30, "Group name should not exceed 30 characters")
    .min(5, "Group name should be atleast 5 characters")
    .required("Group name is required"),
  adminId: yup.string().required("Admin Id is required"),
});

export const updateGroupValidations = yup.object().shape({
  groupName: yup
    .string()
    .matches(
      REGULAR_EXPRESSIONS.LETTERS_AND_NUMBERS,
      "Only letters and numbers are allowed"
    )
    .max(30, "Group name should not exceed 30 characters")
    .min(5, "Group name should be atleast 5 characters")
    .required("Group name is required"),
});

export const joinGroupValidations = yup.object().shape({
  userId: yup.string().required("User id is required"),
  groupId: yup.string().required("Groupd id is required"),
});

export const processJoinRequestsValidation = yup.object().shape({
  action: yup
    .string()
    .oneOf(["delete", "approve"])
    .required("Action is required"),
  userId: yup.string().required("User id is required"),
  groupId: yup.string().required("Groupd id is required"),
});
