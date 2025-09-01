import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../Common/Button/Button";
const RegisterForm = ({ formik, isPending, setShowOTPScreen }) => {
  const navigate = useNavigate();

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col justify-center w-full md:w-[344px]"
      >
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
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full md:w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3  ${
            formik.touched.password && formik.errors.password
              ? "border border-error text-error"
              : ""
          }`}
        />
        <InputText
          type="text"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full md:w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3  ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border border-error text-error"
              : ""
          }`}
        />

        {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
          <p className="text-error text-sm mt-2">
            Please fill out all required fields correctly before submitting the
            form.
          </p>
        )}

        <div className="mt-4">
          <PrimaryButton type="submit" loading={isPending} label="Register" />
        </div>
      </form>
      <div className="flex items-center gap-[6px] mt-4 w-full md:w-[344px]">
        <p className="font-inter font-normal text-xs leading-4 text-[#174473]">
          Already have an account
        </p>
        <p
          className="font-inter font-semibold text-xs leading-4 underline underline-offset-2 cursor-pointer text-primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
