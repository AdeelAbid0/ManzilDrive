import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useGetAllActiveByCountryId, useGetLocation } from "../hooks/PostApi";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import PhoneDialog from "./PhoneDialog";
import EmailDialog from "./EmailDialog";
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
  const [sessionToken, setSessionToken] = useState("");
  const [visible, setVisible] = useState(
    BusinessDetail?.phoneVerified ? false : true
  );
  useEffect(() => {
    if (formik.values?.location?.value === undefined) {
      formik.setFieldValue("location", null);
    }
  }, []);
  const {
    data: CityData,
    isLoading,
    error,
  } = useGetAllActiveByCountryId("665000000000000000000001");
  const {
    data: allLocations,
    isLoading: isLoadingLocations,
    isError: isLocationError,
    refetch: refetchLocation,
  } = useGetLocation({
    input: formik.values?.location || "",
    sessionToken: sessionToken,
  });
  useEffect(() => {
    if (formik.values?.location) {
      refetchLocation();
    }
  }, [formik.values?.location]);
  const handleChange = (e) => {
    formik.setFieldValue("location", e.value);
  };

  // Custom template for dropdown items
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-col p-[8px_12px]">
        <p className="font-inter text-[14px] font-normal leading-4 ">
          {item.data.structured_formatting?.main_text || item.label}
        </p>
        {item.data.structured_formatting?.secondary_text && (
          <p className="font-inter text-[12px] font-normal leading-4 ">
            {item.data.structured_formatting.secondary_text}
          </p>
        )}
      </div>
    );
  };
  const handleSearch = (event) => {
    formik.setFieldValue("location", event.query);
    refetchLocation();
  };
  const suggestions = allLocations?.suggestions || [];
  const filteredSuggestions = suggestions.map((item) => ({
    label: item.description,
    value: item.place_id,
    data: item,
  }));
  return (
    <div className="flex flex-col w-full max-w-[766px] p-[24px_16px] border border-[#EDEDED] rounded-[12px] bg-white">
      {showOtpScreen && (
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
      {!showOtpScreen && !showEmailDialog && (
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
            options={CityData}
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

          <AutoComplete
            value={formik.values.location}
            suggestions={filteredSuggestions}
            completeMethod={handleSearch}
            itemTemplate={itemTemplate}
            onChange={handleChange}
            field="label"
            placeholder="Search Location"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
