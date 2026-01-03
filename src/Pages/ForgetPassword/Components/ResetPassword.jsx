import { useEffect } from "react";
import PrimaryButton from "../../../Common/Button/Button";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { initialValues } from "../Form/resetpasswordinitials";
import { validationSchema } from "../Form/resetpassword.schema";
import { useResetPassword } from "../hooks/ForgetPasswordApi";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../slices/notificationSlice";

const ResetPassword = ({ phoneNumber }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        formik.setFieldError("confirmPassword", "Passwords must match");
        return;
      }
    },
  });
  const { mutate: ResetPassword, isPending: Loading } = useResetPassword();
  const handleResetPassword = () => {
    ResetPassword(
      {
        phoneNumber: phoneNumber,
        otp: "5578",
        newPassword: formik.values.password,
      },
      {
        onSuccess: (res) => {
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
  useEffect(() => {
    if (
      formik.values.confirmPassword &&
      formik.values.password !== formik.values.confirmPassword &&
      !formik.errors.confirmPassword
    ) {
      formik.setFieldError("confirmPassword", "Passwords must match");
    } else if (
      formik.values.password === formik.values.confirmPassword &&
      formik.errors.confirmPassword === "Passwords must match"
    ) {
      formik.setFieldError("confirmPassword", null);
    }
  }, [formik.values.password, formik.values.confirmPassword]);

  return (
    <div className="w-full md:w-[63.2%] min-w-[343px] p-[60px_24px] md:p-0">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="flex font-archivo font-bold text-2xl leading-[100%] text-secondary">
          Create new password
        </h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex flex-col gap-4 mt-6">
          <div>
            <InputText
              type="password"
              name="password"
              placeholder="New Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full md:w-[344px] h-[54px] bg-[#F7F7F7] pl-3 rounded-md ${
                formik.touched.password && formik.errors.password
                  ? "border border-error"
                  : ""
              }`}
            />
          </div>
          <div>
            <InputText
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full md:w-[344px] h-[54px] bg-[#F7F7F7] pl-3 rounded-md ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border border-error"
                  : ""
              }`}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="text-error text-xs mt-1">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
        </div>
        <div className="flex w-full mt-8">
          <PrimaryButton
            label={"Reset Password"}
            type="submit"
            className="w-full"
            onClick={handleResetPassword}
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
