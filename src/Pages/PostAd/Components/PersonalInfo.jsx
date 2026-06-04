import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useGetAllActiveByCountryId } from "../hooks/PostApi";
import { useEffect, useState } from "react";
import PhoneDialog from "./PhoneDialog";
import EmailDialog from "./EmailDialog";
import Location from "../../../Common/LocationInput/Location";
import { useSelector } from "react-redux";
const PersonalInfo = ({
  formik,
  BusinessDetail,
  handleSendOTP,
  handleVerifyOTP,
  showOtpScreen,
  setShowOtpScreen,
  showEmailDialog,
  setShowEmailDialog,
  email,
  setEmail,
  emailOTP,
  setEmailOTP,
  handleSendEmailVerificationCode,
  isLoadingEmailVerificationCode,
  emailOTPScreen,
  handleVerifyEmailOTP,
  EmailOTPVerifyLoading,
}) => {
  const userData = useSelector((state) => state?.user?.user);
  const [visible, setVisible] = useState(
    BusinessDetail?.business?.phoneVerified ? false : true
  );
  useEffect(() => {
    if (formik.values?.location?.value === undefined) {
      formik.setFieldValue("location", null);
    }
  }, []);

  useEffect(() => {
    if (BusinessDetail?.business?.phoneVerified) {
      setVisible(false);
      if (!BusinessDetail?.business?.emailVerified) {
        setShowEmailDialog(true);
      }
    }
  }, [BusinessDetail, setShowEmailDialog]);

  const {
    data: CityData,
    isLoading,
    error,
  } = useGetAllActiveByCountryId("665000000000000000000001");
  const handleChange = (e) => {
    formik.setFieldValue("location", {
      value: e.value || e.place_id,
      label: e.label || e.description,
    });
  };

  // Custom template for dropdown items
  return (
    <div className="flex flex-col w-full max-w-[766px] p-[24px_16px] border border-[#EDEDED] rounded-[12px] bg-white">
      {visible && (
        <PhoneDialog
          formik={formik}
          visible={visible}
          setVisible={setVisible}
          handleSendOTP={handleSendOTP}
          handleVerifyOTP={handleVerifyOTP}
          showOtpScreen={showOtpScreen}
          setShowOtpScreen={setShowOtpScreen}
        />
      )}
      {!showOtpScreen && showEmailDialog && (
        <EmailDialog
          showEmailDialog={showEmailDialog}
          setShowEmailDialog={setShowEmailDialog}
          email={email}
          setEmail={setEmail}
          emailOTP={emailOTP}
          setEmailOTP={setEmailOTP}
          handleSendEmailVerificationCode={handleSendEmailVerificationCode}
          isLoadingEmailVerificationCode={isLoadingEmailVerificationCode}
          emailOTPScreen={emailOTPScreen}
          handleVerifyEmailOTP={handleVerifyEmailOTP}
          EmailOTPVerifyLoading={EmailOTPVerifyLoading}
        />
      )}
      <div className="flex flex-col w-full">
        <h1 className="font-inter font-bold text-[16px] text-[#666666] leading-[100%]">
          Personal Info
        </h1>

        <div className="flex flex-col mt-4 gap-3">
          <InputText
            type="text"
            name="name"
            value={formik.values.name}
            placeholder="First and Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={` font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3  ${
              formik.touched.name && formik.errors.name
                ? "border border-error text-error"
                : ""
            }`}
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

          <InputText
            type="text"
            name="shopName"
            value={formik.values.shopName}
            placeholder="Shop Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={` font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3  ${
              formik.touched.shopName && formik.errors.shopName
                ? "border border-error text-error"
                : ""
            }`}
          />
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
            className={`font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]  ${
              formik.touched.city && formik.errors.city
                ? "border border-error text-error"
                : ""
            }`}
          />

          <Location
            value={formik.values.location}
            onChange={handleChange}
            placeholder="Search Location"
            className="w-full !bg-[#F7F7F7]"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
