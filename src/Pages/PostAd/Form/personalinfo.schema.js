import * as Yup from "yup";
export const ValidationSchemaPersonalInfo = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  secondaryNumber: Yup.string()
    .optional()
    .matches(/^\d{10}$/, "Secondary number must be 10-15 digits"),
  shopName: Yup.string().required("Shop name is required"),
  city: Yup.string().required("City is required"),
  location: Yup.object()
    .shape({
      value: Yup.string().required("Location is required"),
      label: Yup.string().required("Location is required"),
    })
    .required("Location is required"),
});
