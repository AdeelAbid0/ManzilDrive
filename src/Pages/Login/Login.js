import React, { useState } from "react";
import { LogoFooter } from "../../Utils/Icons";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GoogleIcon } from "../../assets/SVG/google-icon.svg";
import { useFormik } from "formik";
import { initialValues } from "./Form/login.initial";
import { validationSchema } from "./Form/login.schema";
import { useGoogleLoginApi, useLoginApi, useResendOTP } from "./hooks/LoginApi";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import PrimaryButton from "../../Common/Button/Button";
import { useDispatch } from "react-redux";
import { showNotification } from "../../slices/notificationSlice";
import { useVerifyPhone } from "../Register/hooks/RegisterApi";
import OTPScreen from "../Register/OTP";
import { setUser } from "../../slices/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOtp, setShowOtp] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const {
    mutate: Login,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
  } = useLoginApi();
  const {
    mutate: GoogleLogin,
    isPending: isGoogleLoginPending,
    isSuccess: isGoogleLoginSuccess,
  } = useGoogleLoginApi();
  const { mutate: VerifyPhone } = useVerifyPhone();
  const { mutate: sendOTP } = useResendOTP();

  const handleLogin = (values) => {
    Login(
      {
        ...values,
      },
      {
        onSuccess: (res) => {
          dispatch(
            showNotification({
              message: "Login success",
              status: "success",
            })
          );
          dispatch(setUser(res));
          localStorage.setItem("Token", res?.token);
          if (res?.business?.status === "active") {
            navigate("/postadd");
          }
        },
        onError: (error) => {
          if (error?.status === "pending") {
            handleSendOTP();
            setShowOtp(true);
          }
          dispatch(
            showNotification({
              message:
                error?.status === "pending"
                  ? "Account not verified"
                  : error?.message,
              status: "error",
            })
          );
        },
      }
    );
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      GoogleLoginApi(token);
    } catch (error) {
      dispatch(
        showNotification({
          message: "Google login error",
          status: "error",
        })
      );
    }
  };

  const GoogleLoginApi = (token) => {
    GoogleLogin(
      { idToken: token },
      {
        onSuccess: (res) => {
          dispatch(setUser(res));
          localStorage.setItem("Token", res?.token);
          navigate("/postadd");
          dispatch(
            showNotification({
              message: "Login success",
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
          dispatch(
            showNotification({
              message: "OTP verified successfully",
              status: "success",
            })
          );
          setShowOtp(false);
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

  return (
    <>
      <div className="w-full !h-[calc(100vh-70px)] bg-primary md:p-0 p-[56px_16px]">
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
            ) : (
              <div className="w-full md:w-[63.2%] min-w-[343px] p-[60px_24px] md:p-0">
                <div className="flex w-full">
                  <h1 className="font-archivo font-bold text-2xl leading-[100%] text-secondary">
                    Welcome Back!
                  </h1>
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

                  <InputText
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full md:w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3  ${
                      formik.touched.password && formik.errors.password
                        ? "border border-error text-error"
                        : ""
                    }`}
                  />
                  {Object.keys(formik.errors).length > 0 &&
                    formik.submitCount > 0 && (
                      <p className="text-error text-sm mt-2">
                        Please fill out all required fields correctly before
                        submitting the form.
                      </p>
                    )}

                  <div className="mt-4">
                    <PrimaryButton
                      label="Login"
                      type="submit"
                      loading={isLoginPending}
                      onClick={formik.handleSubmit}
                    />
                  </div>
                </form>
                <div className="flex items-start w-full h-[28px] mt-2">
                  <p className="font-inter font-medium text-xs leading-4 text-[#174473]">
                    Forgot Your Password ?
                  </p>
                </div>
                <div className="flex items-center gap-[6px] mt-4 w-full">
                  <p className="font-inter font-normal text-xs leading-4 text-[#174473]">
                    Do not have an account ?
                  </p>
                  <p
                    className="font-inter font-semibold text-xs leading-4 underline underline-offset-2 cursor-pointer text-primary"
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Create an Account
                  </p>
                </div>
                <div className="flex flex-col items-center mt-4 w-full max-w-full h-[88px] gap-4">
                  <label className="text-[#788C98] text-base">OR</label>
                  <div
                    className="flex items-center justify-center w-full h-12 border border-[#CAD3D7] cursor-pointer rounded"
                    onClick={() => {
                      handleGoogleLogin();
                    }}
                  >
                    {isGoogleLoginPending ? (
                      <span className="flex justify-center items-center w-[197px]">
                        <i className="pi pi-spin pi-spinner text-gray-500"></i>
                      </span>
                    ) : (
                      <span className="flex gap-3 w-[197px]">
                        <GoogleIcon />

                        <span className="text-[#5D717D] text-base">
                          Login with Google
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
