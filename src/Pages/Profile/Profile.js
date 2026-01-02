import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "../../Common/Button/Button";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import { initialValues } from "./Form/Profile.initial";
import { validationSchema } from "./Form/Profile.schema";
import { useState, useEffect } from "react";
import {
  useGetAllActiveByCountryId,
  useUpdateProfile,
} from "./hooks/ProfileApi";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/userSlice";

const BASE_URL_IMG = process.env.REACT_APP_IMG_URL;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // API Calls
  const { mutate: updateProfile } = useUpdateProfile();
  const { data: CityData } = useGetAllActiveByCountryId(
    "665000000000000000000001"
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues(user),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("businessId", user?.business?._id);
      if (imageFile) formData.append("img", imageFile);
      formData.append("name", values.name);
      formData.append("gender", values.gender);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("secondaryNumber", values.secondaryNumber);
      formData.append("dob", moment(values.dob).format("YYYY-MM-DD"));
      formData.append("city", values.city);
      formData.append("shopName", values.shopName);
      formData.append("userName", values.userName);
      formData.append("email", values.email);

      updateProfile(formData, {
        onSuccess: (res) => dispatch(setUser(res)),
        onError: (err) => console.log("Update failed:", err),
      });
    },
  });
  const GenderOptions = [
    { option: "Male", value: "male" },
    { option: "Female", value: "female" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = () => formik.handleSubmit();

  return (
    <div className="flex flex-col gap-2 !w-[64%]">
      {/* Avatar */}
      <div className="flex items-center gap-4 p-4 bg-white mt-10 rounded-xl">
        <div className="relative w-20 h-20 group">
          <label
            htmlFor="avatarUpload"
            className="cursor-pointer block w-full h-full"
          >
            <img
              src={preview || `${BASE_URL_IMG}/${user?.business?.img}`}
              alt="avatar"
              className="w-20 h-20 rounded-xl object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <i className="pi pi-pencil text-white text-lg"></i>
            </div>
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <h1 className="!m-0 text-2xl font-medium leading-8 text-[#455159]">
            {formik.values.name || ""}
          </h1>
          <p className="!m-0 text-sm leading-4 font-normal text-[#455159]">
            {user?.business?.phoneVerified
              ? `+92 ${user?.business?.phoneNumber}`
              : ""}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 bg-white rounded-xl">
        <div className="flex flex-col mt-4 gap-3">
          <InputText
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="First and Last Name"
            className="font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded pl-3"
          />
          <Dropdown
            options={GenderOptions}
            optionLabel="option"
            optionValue="value"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Gender"
            className="font-inter font-normal text-input items-center text-sm bg-[#F7F7F7] h-[49px] rounded"
          />
          <div className="flex gap-1">
            <div className="font-inter flex justify-center items-center text-input  text-sm bg-[#F7F7F7] w-[59px] h-[50px] border border-[#BFD0CB] rounded">
              +92
            </div>
            <InputText
              type="number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              disabled
              placeholder="Phone Number"
              className={` font-inter w-full font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3  ${
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? "border border-error text-error"
                  : ""
              }`}
            />
          </div>
          <div className="flex gap-1">
            <div className="font-inter flex justify-center items-center text-input  text-sm bg-[#F7F7F7] w-[59px] h-[50px] border border-[#BFD0CB] rounded">
              +92
            </div>
            <InputText
              type="number"
              name="secondaryNumber"
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,10}$/.test(input)) {
                  formik.setFieldValue("secondaryNumber", input);
                }
              }}
              value={formik.values.secondaryNumber}
              placeholder="Secondary Number  or Whatsapp Number"
              className={`w-full font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3  ${
                formik.touched.secondaryNumber && formik.errors.secondaryNumber
                  ? "border border-error text-error"
                  : ""
              }`}
            />
          </div>

          <div>
            <Calendar
              value={formik.values.dob ? new Date(formik.values.dob) : null}
              onChange={(e) => formik.setFieldValue("dob", e.value)}
              onBlur={formik.handleBlur}
              placeholder="Date of Birth"
              className="font-inter w-full font-normal text-input text-sm h-[49px] rounded"
            />
          </div>
          <Dropdown
            value={formik.values.city}
            name="city"
            options={CityData || []}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            optionLabel="name"
            optionValue="_id"
            placeholder="City"
            filter
            filterPlaceholder="Search Make"
            className={`font-inter font-normal items-center text-input text-sm h-[49px] bg-[#F7F7F7] rounded ${
              formik.touched.city && formik.errors.city
                ? "border border-error text-error"
                : ""
            }`}
          />
          <InputText
            type="text"
            name="shopName"
            value={formik.values.shopName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Shop Name"
            className="font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded pl-3"
          />
          <InputText
            type="text"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="User name"
            className="font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded pl-3"
          />
          <InputText
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter email"
            className="font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded pl-3"
          />

          <PrimaryButton label="Save changes" onClick={handleUpdateProfile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
