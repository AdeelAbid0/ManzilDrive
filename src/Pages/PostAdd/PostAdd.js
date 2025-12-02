import ImageUpload from "./Components/ImageUpload";
import PersonalInfo from "./Components/PersonalInfo";
import {
  AddBusiness,
  AddVehicle,
  useGetAllMakes,
  useGetAllmodelByMake,
  useGetAllVariantsBymodel,
  useGetBusinessDetail,
  useSendEmailVerificationCode,
  useSendOTP,
  useVerifyEmailOtp,
  useVerifyPhoneAuth,
} from "./hooks/PostApi";
import CarDetailForm from "./Components/CarDetailForm";
import { useFormik } from "formik";
import { initialValues } from "./Form/postadd.initial";
import { ValidationSchema } from "./Form/postadd.schema";
import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "../../Common/Button/Button";
import { Button } from "primereact/button";
import { ValidationSchemaPersonalInfo } from "./Form/personalinfo.schema";
import { initialValuesPersonalInfo } from "./Form/personalinfo.initial";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../slices/notificationSlice";
import { setUser } from "../../slices/userSlice";

const PostAdd = () => {
  const dispatch = useDispatch();
  const [personalInfoActive, setPersonalInfoActive] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [images, setImages] = useState([]);
  const userData = useSelector((state) => state.user.user);
  const [showEmailDialog, setShowEmailDialog] = useState(
    !userData?.business?.emailVerified
  );
  const [emailOTPScreen, setEmailOTPScreen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailOTP, setEmailOTP] = useState("");
  const businessId = userData?.business?._id;

  // ------------------- Formik for Car Detail -------------------
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {},
  });

  // ------------------- Formik for Personal Info -------------------
  const formikPersonalInfo = useFormik({
    initialValues: initialValuesPersonalInfo,
    validationSchema: ValidationSchemaPersonalInfo,
    onSubmit: (values) => {
      const formDataForPersonalInfo = new FormData();
      formDataForPersonalInfo.append("businessId", businessId);
      formDataForPersonalInfo.append("name", values.name);
      formDataForPersonalInfo.append("city", values.city);
      formDataForPersonalInfo.append("phoneNumber", values.phoneNumber);
      formDataForPersonalInfo.append("sessionToken", "");
      formDataForPersonalInfo.append("shopName", values.shopName);
      formDataForPersonalInfo.append("secondaryNumber", values.secondaryNumber);
      formDataForPersonalInfo.append("address", values.location.label);
      formDataForPersonalInfo.append("placeId", values.location.value);

      addBusiness(formDataForPersonalInfo, {
        onSuccess: (res) => {
          dispatch(setUser(res));
          dispatch(
            showNotification({
              message: "Business Updated Successfully",
              status: "success",
            })
          );

          const formDataForAddVehicle = new FormData();
          formDataForAddVehicle.append("business", businessId);
          formDataForAddVehicle.append("make", formik.values.make);
          formDataForAddVehicle.append("model", formik?.values?.model);
          formDataForAddVehicle.append("variant", formik?.values?.variant);
          formDataForAddVehicle.append("year", formik.values.year);
          formDataForAddVehicle.append(
            "rentPerDay",
            formik?.values?.rentPerDay
          );
          formDataForAddVehicle.append(
            "description",
            formik?.values?.description
          );
          formDataForAddVehicle.append(
            "availability",
            formik?.values?.availability
          );
          formDataForAddVehicle.append(
            "transmission",
            formik?.values?.transmission
          );
          formDataForAddVehicle.append(
            "acheater",
            formik?.values?.acheater === "AC / Heater installed" ? true : false
          );
          formDataForAddVehicle.append("seats", formik?.values?.seats);
          images.forEach((file) => {
            if (file) formDataForAddVehicle.append("photos", file);
          });

          addVehicle(formDataForAddVehicle, {
            onSuccess: () => {
              dispatch(
                showNotification({
                  message: "Post Added Successfully",
                  status: "success",
                })
              );
              formik.resetForm();
              setPersonalInfoActive(false);
              setImages([]);
            },
            onError: (error) => {
              dispatch(
                showNotification({
                  message: "Post Added Error",
                  status: "error",
                })
              );
            },
          });
        },
        onError: (res) => {
          dispatch(
            showNotification({
              message: "Failed to update business information",
              status: "succerroress",
            })
          );
        },
      });
    },
  });
  // ------------------- API HOOKS -------------------
  // Get all makes api
  const { data: makesData } = useGetAllMakes();
  // Get All models by make api
  const makeId = formik.values.make;
  const modelId = formik.values.model;
  const { data: modelsData, refetch: refetchmodel } =
    useGetAllmodelByMake(makeId);
  // Get All Variants api
  const { data: variantData, refetch: refetchVariant } =
    useGetAllVariantsBymodel(modelId);
  // Add Business api
  const { mutate: addBusiness, isPending: BusinessLoading } = AddBusiness();
  // Add Vehicle api
  const { mutate: addVehicle } = AddVehicle();
  // Get Business Detail api
  const { data: BusinessDetail, refetch: refetchBusinessDetail } =
    useGetBusinessDetail(businessId);
  // send otp to number api
  const { mutate: sendOTP } = useSendOTP();
  const handleSendOTP = () => {
    sendOTP(
      {
        phoneNumber: formikPersonalInfo.values.phoneNumber.toString(),
        businessId: businessId,
      },
      {
        onSuccess: (res) => {
          setShowOtpScreen(true);
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
  // Verify OTP api
  const { mutate: verifyOTP } = useVerifyPhoneAuth();
  const handleVerifyOTP = () => {
    verifyOTP(
      {
        phoneNumber: formikPersonalInfo.values.phoneNumber.toString(),
        phoneCode: "5578",
      },
      {
        onSuccess: (res) => {
          setShowOtpScreen(false);
          dispatch(
            showNotification({
              message: "OTP verified successfully",
              status: "success",
            })
          );

          refetchBusinessDetail();
        },
        onError: (error) => {
          dispatch(
            showNotification({
              message: "OTP verify error",
              status: "error",
            })
          );
        },
      }
    );
  };
  // send otp to email api
  const {
    mutate: SendEmailVerificationCode,
    isPending: isLoadingEmailVerificationCode,
  } = useSendEmailVerificationCode();
  const handleSendEmailVerificationCode = () => {
    SendEmailVerificationCode(
      {
        email: email,
        businessId: businessId,
      },
      {
        onSuccess: (res) => {
          setEmailOTPScreen(true);
          dispatch(
            showNotification({
              message: res?.message,
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
  //verify email api
  const { mutate: VerifyEmailOTP, isPending: EmailOTPVerifyLoading } =
    useVerifyEmailOtp();
  const handleVerifyEmailOTP = () => {
    VerifyEmailOTP(
      {
        email: email,
        emailCode: emailOTP,
      },
      {
        onSuccess: (res) => {
          setShowEmailDialog(false);
          dispatch(
            showNotification({
              message: res?.message,
              status: "success",
            })
          );

          refetchBusinessDetail();
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
  // ------------------- Effects -------------------
  useEffect(() => {
    if (BusinessDetail) {
      if (BusinessDetail?.business?.phoneVerified) {
        formikPersonalInfo.setFieldValue(
          "phoneNumber",
          BusinessDetail?.business?.phoneNumber
        );
      }
      formikPersonalInfo.setFieldValue("name", BusinessDetail?.business?.name);
      formikPersonalInfo.setFieldValue(
        "secondaryNumber",
        BusinessDetail?.business?.secondaryNumber
      );
      formikPersonalInfo.setFieldValue(
        "shopName",
        BusinessDetail?.business?.shopName
      );
      formikPersonalInfo.setFieldValue(
        "city",
        BusinessDetail?.business?.city?._id
      );
      formikPersonalInfo.setFieldValue("location", {
        value: BusinessDetail?.business?.location?.placeId,
        label: BusinessDetail?.business?.location?.address,
      });
    }
  }, [BusinessDetail]);

  // ------------------- UI helpers -------------------
  const requiredFields = [
    "make",
    "model",
    "variant",
    "year",
    "rentPerDay",
    "description",
    "availability",
    "acheater",
    "transmission",
    "seats",
  ];
  const disablefield = useMemo(
    () => requiredFields.some((field) => !formik.values[field]),
    [formik.values]
  );
  // ------------------- RENDER -------------------

  console.log({ formikPersonalInfo });
  return (
    <div className="flex flex-col justify-center items-center mt-2 w-full mb-8 gap-6">
      {personalInfoActive ? (
        <div className="h-full w-full md:max-w-[766px] md:w-[64%] md:mt-6 p-4 md:p-0">
          <PersonalInfo
            formik={formikPersonalInfo}
            BusinessDetail={BusinessDetail}
            handleSendOTP={handleSendOTP}
            handleVerifyOTP={handleVerifyOTP}
            showOtpScreen={showOtpScreen}
            setShowOtpScreen={setShowOtpScreen}
            showEmailDialog={showEmailDialog}
            setShowEmailDialog={setShowEmailDialog}
            email={email}
            setEmail={setEmail}
            emailOTP={emailOTP}
            setEmailOTP={setEmailOTP}
            handleSendEmailVerificationCode={handleSendEmailVerificationCode}
            isLoadingEmailVerificationCode={isLoadingEmailVerificationCode}
            emailOTPScreen={emailOTPScreen}
            setEmailOTPScreen={setEmailOTPScreen}
            handleVerifyEmailOTP={handleVerifyEmailOTP}
            EmailOTPVerifyLoading={EmailOTPVerifyLoading}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center md:mt-2 w-full max-w-[1198px] gap-6 p-4 md:p-0">
          <div className="flex  w-full md:max-w-[766px] md:w-[64%] md:m-0 p-[24px_16px] border border-[#EDEDED] rounded-[12px] bg-white">
            <CarDetailForm
              formik={formik}
              data={makesData}
              modelsData={modelsData}
              variantData={variantData}
            />
          </div>
          <div className="flex flex-col  w-full md:max-w-[766px] md:w-[64%] md:m-0 p-[24px_16px] border border-[#EDEDED] rounded-[12px] bg-white">
            <ImageUpload images={images} setImages={setImages} />
          </div>
        </div>
      )}

      <div className="flex justify-center w-full md:p-0 pl-4 pr-4">
        <div className="flex justify-between w-full md:max-w-[766px] md:w-[64%] md:m-0 gap-10 ">
          {personalInfoActive && (
            <Button
              label="Back"
              className="bg-transparent border border-primary text-primary  flex justify-center items-center w-full h-[48px]"
              onClick={() => {
                setPersonalInfoActive(false);
              }}
            />
          )}
          <div className=" w-full h-auto !m-0">
            <PrimaryButton
              type={personalInfoActive ? "submit" : "button"}
              label={personalInfoActive ? "Post Now" : "Next"}
              disabled={disablefield}
              loading={BusinessLoading}
              handleClick={() => {
                if (images?.length < 1) {
                  dispatch(
                    showNotification({
                      message: "Upload at least one image to proceed",
                      status: "error",
                    })
                  );
                } else {
                  personalInfoActive
                    ? formikPersonalInfo.handleSubmit()
                    : setPersonalInfoActive(true);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAdd;
