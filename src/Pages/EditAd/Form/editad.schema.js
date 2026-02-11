import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  make: Yup.object()
    .shape({
      _id: Yup.string().required("Make is required"),
      name: Yup.string().required("Make is required"),
    })
    .required("Make is required"),
  model: Yup.object()
    .shape({
      _id: Yup.string().required("Model is required"),
      name: Yup.string().required("Model is required"),
    })
    .required("Model is required"),
  variant: Yup.object()
    .shape({
      _id: Yup.string().required("Variant is required"),
      name: Yup.string().required("Variant is required"),
    })
    .required("Variant is required"),
  year: Yup.number()
    .required("Year is required")
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Invalid year"),
  color: Yup.string().required("Color is required"),
  transmission: Yup.string().required("Transmission is required"),
  fuelType: Yup.string().required("Fuel type is required"),
  engineCapacity: Yup.number()
    .required("Engine capacity is required")
    .min(0, "Invalid engine capacity"),
  mileage: Yup.number()
    .required("Mileage is required")
    .min(0, "Mileage cannot be negative"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  description: Yup.string().required("Description is required"),
  features: Yup.array().of(Yup.string()),
  rentPerDay: Yup.number()
    .required("Rent per day is required")
    .min(0, "Rent cannot be negative"),
  securityDeposit: Yup.number()
    .required("Security deposit is required")
    .min(0, "Deposit cannot be negative"),
  photos: Yup.array().of(Yup.mixed()).min(1, "At least one photo is required"),
});
