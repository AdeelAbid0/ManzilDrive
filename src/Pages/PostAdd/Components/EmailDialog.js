import { InputText } from "primereact/inputtext";
import PrimaryButton from "../../../Common/Button/Button";
import { Dialog } from "primereact/dialog";
import { InputOtp } from "primereact/inputotp";
import { formatTime } from "../../../Utils/helpers";
import { useEffect, useState } from "react";

const EmailDialog = ({
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
  const [timeLeft, setTimeLeft] = useState(120);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
        visible={showEmailDialog}
        style={{ width: "46%" }}
        headerClassName="hidden"
        onHide={() => setShowEmailDialog(false)}
      >
        {emailOTPScreen ? (
          <div>
            <h1 className="!m-0 flex w-full justify-center font-manrope font-semibold  text-[24px] text-[#3E464C] leading-[36px]">
              Verify Your Account
            </h1>
            <p className="!m-0 w-full text-center pt-3 font-inter font-normal text-[16px] text-[#505F6A] leading-[22px]">
              Please enter the 4-digit code sent to your email address to
              confirm your identity and complete your registration.
            </p>
            <div className="flex w-full justify-center items-center gap-6 mt-10">
              <InputOtp
                value={emailOTP}
                onChange={(e) => {
                  setEmailOTP(e.value);
                }}
              />
              <p className="text-[#303F3C] font-medium text-xs">
                {formatTime(timeLeft)}
              </p>
            </div>
            <div className="flex w-full justify-center mt-5">
              <p className="flex gap-[6px] text-[#174473] text-xs font-normal leading-4">
                Didn't Get the Code?
                <span
                  className="font-semibold text-[#00796B] text-xs underline underline-offset-2 cursor-pointer leading-4"
                  onClick={handleSendEmailVerificationCode}
                >
                  Resend
                </span>
              </p>
            </div>

            <div className="mt-9 flex w-full justify-end ">
              <PrimaryButton
                type="button"
                label="Verify"
                className="!w-[160px]"
                disabled={!emailOTP}
                loading={EmailOTPVerifyLoading}
                handleClick={handleVerifyEmailOTP}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="!m-0 font-manrope font-semibold  text-[24px] text-[#3E464C] leading-[36px]">
              Verify Your Email
            </h1>
            <p className="!m-0 pt-3 font-inter font-normal text-[16px] text-[#505F6A] leading-[22px]">
              Verify your email to see all features and get a higher limit for
              your car ads.
            </p>
            <div className="flex gap-1 mt-6">
              <InputText
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={` font-inter w-full font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3
              
            `}
              />
            </div>
            <div className="mt-9 flex w-full justify-end ">
              <PrimaryButton
                type="button"
                label="Verify"
                loading={isLoadingEmailVerificationCode}
                disabled={!isEmailValid}
                handleClick={handleSendEmailVerificationCode}
                className="!w-[160px]"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default EmailDialog;
