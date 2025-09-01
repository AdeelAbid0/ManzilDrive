import * as Yup from "yup";
export const ValidationSchema = Yup.object().shape({
  make: Yup.string().required(),
  model: Yup.string().required(),
  variant: Yup.string().required(),
  year: Yup.string().required(),
  rentPerDay: Yup.string().required(),
  description: Yup.string().required(),
  availability: Yup.string().required(),
  acheater: Yup.string().required(),
  transmission: Yup.string().required(),
  seats: Yup.string().required(),
});
