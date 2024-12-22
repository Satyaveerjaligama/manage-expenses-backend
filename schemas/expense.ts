import * as yup from "yup";
import { REGULAR_EXPRESSIONS } from "../utils/constants";

export const addExpenseValidations = yup.object().shape({
  userOrGroupId: yup.string().required("User or group id is required"),
  expenseName: yup
    .string()
    .matches(
      REGULAR_EXPRESSIONS.LETTERS_AND_NUMBERS,
      "Only letters and number are allowed"
    )
    .max(30, "Label should not exceed 30 characters")
    .min(3, "Label should be atleast 3 characters")
    .required("Label is required"),
  amount: yup.number().required("Amount is required"),
  category: yup.string().required("Category is required"),
  paymentMethod: yup.string().required("Payment method is required"),
  date: yup.string().required("Date is required"),
  isGroupExpense: yup.boolean().required(),
  addedBy: yup.string().when("isGroupExpense", {
    is: true,
    then: () => yup.string().required("Added by is required"),
    otherwise: () => yup.string().optional(),
  }),
  paymentType: yup.string().when("isGroupExpense", {
    is: true,
    then: () => yup.string().required("Payment type is required"),
    otherwise: () => yup.string().optional(),
  }),
});
