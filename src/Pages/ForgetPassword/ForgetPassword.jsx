import React, { useState } from "react";
import OTPScreen from "../Register/OTP";
import { useVerifyPhone } from "../Register/hooks/RegisterApi";
import { useFormik } from "formik";
import { initialValues } from "./Form/forgetpassword.initial";
import { validationSchema } from "./Form/forgetpassword.schema";
import { InputText } from "primereact/inputtext";
import PrimaryButton from "../../Common/Button/Button";
import { useResendOTP } from "../Login/hooks/LoginApi";
import { useDispatch } from "react-redux";
import { showNotification } from "../../slices/notificationSlice";
import ResetPassword from "./Components/ResetPassword";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [showOtp, setShowOtp] = useState(false);
  const [showPasswordScreen, setShowPasswordScreen] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { mutate: VerifyPhone } = useVerifyPhone();
  const { mutate: sendOTP } = useResendOTP();
  const handleSendOTP = () => {
    sendOTP(
      {
        phoneNumber: formik.values.phoneNumber.toString(),
      },
      {
        onSuccess: (res) => {
          setShowOtp(true);
          dispatch(
            showNotification({
              message: "OTP sent successfully",
              status: "success",
            })
          );
        },
        onError: (error) => {
          dispatch(
            showNotification({
              message: "Error while sending OTP",
              status: "error",
            })
          );
        },
      }
    );
  };
  const handleVerifyPhone = () => {
    VerifyPhone(
      {
        phoneNumber: formik.values.phoneNumber.toString(),
        phoneCode: "4078",
      },
      {
        onSuccess: (res) => {
          console.log({ res });
          setShowOtp(false);
          setShowPasswordScreen(true);
          dispatch(
            showNotification({
              message: "OTP verified successfully",
              status: "success",
            })
          );
        },
        onError: (error) => {
          dispatch(
            showNotification({
              message: error?.message,
              status: "error",
            })
          );
        },
      }
    );
  };
  console.log({ showOtp, showPasswordScreen });
  return (
    <div className="w-full !h-[100vh] bg-primary md:p-0 p-[56px_16px] md:rounded-tr-lg md:rounded-br-lg">
      <div className="flex md:flex-row flex-col  w-full h-full justify-start md:justify-between">
        <div className="flex w-full md:w-[63.2%] justify-center items-center">
          <div className="flex flex-col justify-center w-full md:w-[50%] lg:w-[63.2%]  ">
            <div>
              <div className="hidden md:block mt-6">
                <p className="font-archivo w-full font-semibold text-[32px] md:text-[40px] lg:text-[56px] leading-[100%] md:leading-[68px] text-white ">
                  Your Gateway to <br /> Effortless Car Rentals
                </p>
              </div>
              <label className="hidden md:block font-archivo font-medium text-[20px] md:text-2xl leading-[100%] text-white mt-4">
                –Login Now
              </label>
            </div>
            <div className="hidden md:block md:absolute bottom-[20px]">
              <img src="Register.png" alt="" />
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-start md:justify-center items-center w-full  md:w-[50%] lg:w-[38%] h-auto md:h-full bg-white rounded-lg z-0 ">
          {showOtp ? (
            <OTPScreen handleVerifyPhone={handleVerifyPhone} />
          ) : showPasswordScreen ? (
            <ResetPassword phoneNumber={formik.values.phoneNumber} />
          ) : (
            <div className="w-full md:w-[63.2%] min-w-[343px] p-[60px_24px] md:p-0">
              <div className="flex flex-col gap-2 w-full">
                <h1 className="flex font-archivo font-bold text-2xl leading-[100%] text-secondary">
                  Forgot your password?
                </h1>
                <p className="text-[#445D58] text-xs leading-4 font-normal">
                  4-digit code will be sent to you number to help rest your
                  Password.
                </p>
              </div>
              <form onSubmit={formik.handleSubmit} className="w-full">
                <div className="flex gap-1 mt-6">
                  <div className="font-inter flex justify-center items-center text-input  text-sm bg-[#F7F7F7] w-[59px] h-[50px] border border-[#BFD0CB] rounded">
                    +92
                  </div>
                  <InputText
                    type="number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,10}$/.test(input)) {
                        formik.setFieldValue("phoneNumber", input);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    placeholder="Phone Number"
                    className={` font-inter w-full font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3  ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "border border-error text-error"
                        : ""
                    }`}
                  />
                </div>
                <div className="flex w-full mt-8">
                  <PrimaryButton label={"Reset"} onClick={handleSendOTP} />
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
