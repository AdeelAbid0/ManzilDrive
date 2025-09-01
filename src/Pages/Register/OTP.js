import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { useEffect, useState } from "react";
import PrimaryButton from "../../Common/Button/Button";
import { formatTime } from "../../Utils/helpers";
const OTPScreen = ({ setTokens, token, handleVerifyPhone }) => {
  const [timeLeft, setTimeLeft] = useState(120);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <div className="w-full justify-center md:w-[344px] flex flex-col gap-6">
      <p className="text-[#445D58] text-xs leading-4 font-normal mt-3">
        Enter the 4-digit code sent to your email to confirm your identity and
        complete your registration.
      </p>
      <div className="flex w-full justify-center items-center gap-6">
        <InputOtp
          value={token}
          onChange={(e) => {
            setTokens(e.value);
          }}
        />
        <p className="text-[#303F3C] font-medium text-xs">
          {formatTime(timeLeft)}
        </p>
      </div>

      <div className="w-full">
        <PrimaryButton
          type="submit"
          label="Verify"
          handleClick={handleVerifyPhone}
        />
      </div>
      <p className="flex gap-[6px] text-[#174473] text-xs font-normal leading-4">
        Didn't Get the Code?
        <span className="font-semibold text-[#00796B] text-xs underline underline-offset-2 cursor-pointer leading-4">
          Resend
        </span>
      </p>
    </div>
  );
};

export default OTPScreen;
