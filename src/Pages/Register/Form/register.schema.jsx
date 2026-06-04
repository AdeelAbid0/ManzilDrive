import * as Yup from "yup";
export const RegisterSchema = Yup.object().shape({
  phoneNumber: Yup.string().length(10).required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
