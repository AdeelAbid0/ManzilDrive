import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  gender: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  secondaryNumber: Yup.string(),
  dob: Yup.string().required(),
  city: Yup.string().required(),
  shopName: Yup.string().required(),
  userName: Yup.string().required(),
  email: Yup.string().email("Invalid email").required(),
});
