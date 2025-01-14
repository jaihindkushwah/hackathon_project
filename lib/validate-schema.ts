import * as yup from "yup";

export const loginSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email().required("Email is required"),
});
export const registerSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  lastName: yup.string().required("Last name is required"),
  firstName: yup.string().required("First name is required"),
});

export const createHackathonSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  endDate: yup.date().required("End date is required"),
  startDate: yup.date().required("Start date is required"),
  location: yup.string().required("Location is required"),
  title: yup.string().required("Title is required"),
});
