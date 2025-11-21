import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import PrimaryButton from "../../../Common/Button/Button";
import { useVerifyPhone, useVerifyPhoneAuth } from "../hooks/PostApi";
import { useEffect, useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { formatTime } from "../../../Utils/helpers";
const PhoneDialog = ({
  formik,
  visible,
  setVisible,
  handleSendOTP,
  handleVerifyOTP,
  showOtpScreen,
  setShowOtpScreen,
}) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <div>
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "46%" }}
        headerClassName="hidden"
        onHide={() => {
          // if (!visible) return;
          setVisible(false);
        }}
      >
        {showOtpScreen ? (
          <div>
            <h1 className="!m-0 flex w-full justify-center font-manrope font-semibold  text-[24px] text-[#3E464C] leading-[36px]">
              Verify Your Account
            </h1>
            <p className="!m-0 w-full text-center pt-3 font-inter font-normal text-[16px] text-[#505F6A] leading-[22px]">
              Enter the 4-digit code sent to your Phone Number to confirm your
              identity and complete your registration.
            </p>
            <div className="flex w-full justify-center items-center gap-6 mt-10">
              <InputOtp
                value={otp}
                onChange={(e) => {
                  setOtp(e.value);
                }}
              />
              <p className="text-[#303F3C] font-medium text-xs">
                {formatTime(timeLeft)}
              </p>
            </div>
            <div className="mt-9 flex w-full justify-end ">
              <PrimaryButton
                type="button"
                label="Verify"
                className="!w-[160px]"
                disabled={!formik.values.phoneNumber}
                handleClick={handleVerifyOTP}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="!m-0 font-manrope font-semibold  text-[24px] text-[#3E464C] leading-[36px]">
              Verify Your Phone Number
            </h1>
            <p className="!m-0 pt-3 font-inter font-normal text-[16px] text-[#505F6A] leading-[22px]">
              Enter the 4-digit code we sent to your phone to confirm it's
              really you and continue registration.
            </p>
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
            <div className="mt-9 flex w-full justify-end ">
              <PrimaryButton
                type="button"
                label="Verify"
                className="!w-[160px]"
                disabled={!formik.values.phoneNumber}
                handleClick={handleSendOTP}
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default PhoneDialog;
