import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  // email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
});
