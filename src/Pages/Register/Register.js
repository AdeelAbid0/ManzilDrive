import { useState } from "react";
import { LogoFooter } from "../../Utils/Icons";
import RegisterForm from "./components/RegisterForm";
import OTPScreen from "./OTP";
import { useNavigate } from "react-router-dom";
import { useRegisterApi, useVerifyPhone } from "./hooks/RegisterApi";
import { useFormik } from "formik";
import { initialValues } from "./Form/register.initial";
import { RegisterSchema } from "./Form/register.schema";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [token, setTokens] = useState("");
  const [formValues, setFormValues] = useState();
  const { mutate: VerifyPhone } = useVerifyPhone();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setFormValues(values);
      const data = {
        phoneNumber: values?.phoneNumber.toString(),
        password: values?.password,
      };
      handleRegister(data);
    },
  });
  const {
    mutate: RegisterFunction,
    isPending,
    isError,
    isSuccess,
  } = useRegisterApi();

  const handleRegister = (data) => {
    RegisterFunction(
      {
        ...data,
      },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          setShowOTPScreen(true);
        },
        onError: (error) => {
          toast.error(error?.message);
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
          toast.success(res?.message);
          navigate("/login");
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full !h-[calc(100vh-70px)] bg-primary md:p-0 p-[56px_16px]">
        <div className="flex md:flex-row flex-col w-full h-full justify-start md:justify-between">
          <div className="flex w-full md:w-[63.2%] justify-center items-center">
            <div className="flex flex-col justify-center w-full md:w-[50%] lg:w-[63.2%]">
              <div>
                <div className="hidden md:block mt-6">
                  <p className="font-archivo w-full font-semibold text-[32px] md:text-[40px] lg:text-[56px] leading-[100%] md:leading-[68px] text-white">
                    Your Trusted <br /> Partner for Effortless Car Rentals
                  </p>
                </div>
                <label className="hidden md:block font-archivo font-medium text-[20px] md:text-2xl leading-[100%] text-white mt-4">
                  – Join Us Today!
                </label>
              </div>
              <div className="hidden md:block md:absolute bottom-[20px]">
                <img
                  src="Register.png"
                  alt=""
                  className="w-full max-w-[1292px]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start md:justify-center items-center w-full md:w-[50%] lg:w-[42%] h-auto md:h-full bg-white rounded-lg z-0">
            <div className="w-full md:w-[63.2%] min-w-[343px] p-[60px_24px] md:p-0">
              <div className="flex w-full">
                <h1 className="font-archivo font-bold text-2xl leading-[100%] text-secondary">
                  {!showOTPScreen
                    ? "Register Your Business"
                    : "Verify Your Account"}
                </h1>
              </div>

              {!showOTPScreen ? (
                <RegisterForm
                  formik={formik}
                  isPending={isPending}
                  setShowOTPScreen={setShowOTPScreen}
                  formValues={formValues}
                />
              ) : (
                <OTPScreen
                  token={token}
                  setTokens={setTokens}
                  handleVerifyPhone={handleVerifyPhone}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
