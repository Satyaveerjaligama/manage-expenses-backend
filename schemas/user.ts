import * as yup from "yup";
import { REGULAR_EXPRESSIONS } from "../utils/constants";

export const addUserValidations = yup.object().shape({
  userName: yup
    .string()
    .matches(
      REGULAR_EXPRESSIONS.LETTERS_AND_NUMBERS,
      "User name should only include letters and numbers"
    )
    .max(20, "User name should not exceed 20 characters")
    .min(5, "User name should be at least 5 characters")
    .required("User name is required"),
  emailOrPhoneNumber: yup
    .string()
    .test(
      "emailOrPhoneNumber",
      "Enter valid Email or Phone number",
      (value) => {
        if (!value) return false;
        return (
          REGULAR_EXPRESSIONS.EMAIL.test(value) ||
          REGULAR_EXPRESSIONS.PHONE_NUMBER.test(value)
        );
      }
    )
    .required("Email/Phone Number is required"),
  password: yup
    .string()
    .max(20, "Password should not exceed 20 characters")
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
