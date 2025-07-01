import { useState } from "react";
import { LogoFooter } from "../../Utils/Icons";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { ReactComponent as GoogleIcon } from "../../assets/SVG/google-icon.svg";
import { ReactComponent as FacebookIcon } from "../../assets/SVG/facebook-icon.svg";
import { ApiUrl } from "../../api/apiUrls";
import { useClientMutation } from "../../api/api-service";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    shop: "",
  });

  const [selectedCity, setSelectedCity] = useState(null);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const { mutate, isPending, isSuccess, isError, error } = useClientMutation({
    url: ApiUrl.Auth.Register,
    method: "POST",
  });

  const handleRegister = () => {
    const payload = {
      ...formData,
      city: selectedCity?.name ?? "",
      country: "424242342342", // static for now
    };

    mutate(payload, {
      onSuccess: (res) => {
        console.log("✅ Registered:", res);
        // navigate("/login"); // enable if needed
      },
      onError: (err) => {
        console.error("Error:", err);
      },
    });
  };

  return (
    <div className="flex gap-[229px] h-[100vh] bg-primary">
      <div className="flex flex-col justify-center w-[567px] ml-[100px]">
        <div className="flex items-center w-[246px] h-[64px] gap-3 mt-[100px]">
          <span>
            <LogoFooter />
          </span>
          <p className="font-inter font-bold text-[28px] leading-[100%] text-white">
            Manzil Drive
          </p>
        </div>
        <div className="mt-6">
          <p className="font-archivo font-semibold text-[56px] leading-[68px] text-white">
            Your Trusted <br /> Partner for Effortless Car Rentals
          </p>
        </div>
        <label className="font-archivo font-medium text-2xl leading-[100%] text-white mt-4">
          – Join Us Today!
        </label>
        <div className="w-[1292px] ml-[77px] mt-[-80px]">
          <img src="Register.png" alt="" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-[544px] h-auto bg-white rounded-lg z-0">
        <div className="flex w-[344px]">
          <h1 className="font-archivo font-bold text-2xl leading-[100%] text-secondary">
            Register Your Business
          </h1>
        </div>

        <InputText
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3"
        />

        <InputText
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3"
        />

        <InputText
          type="number"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
          className="w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3"
        />

        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select a City"
          className="w-[344px] h-[54px] mt-4 bg-[#F7F7F7]"
        />

        <InputText
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3"
        />

        <InputText
          type="text"
          placeholder="Shop Name"
          value={formData.shop}
          onChange={(e) => setFormData({ ...formData, shop: e.target.value })}
          className="w-[344px] h-[54px] mt-4 bg-[#F7F7F7] pl-3"
        />

        <Button
          onClick={handleRegister}
          label={isPending ? "Registering..." : "Register"}
          className="text-white w-[344px] h-[48px] bg-primary mt-4"
        />

        <div className="flex items-center gap-[6px] mt-4 w-[344px]">
          <p className="text-[#174473] text-xs">Already have an account ?</p>
          <p
            className="text-primary text-xs underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </p>
        </div>

        <div className="flex flex-col items-center mt-4 w-full max-w-[344px] h-[152px] gap-4">
          <label className="text-[#788C98] text-base">OR</label>
          <div className="flex items-center justify-center w-full h-12 border border-[#CAD3D7] cursor-pointer rounded">
            <span className="flex gap-3 w-[197px]">
              <GoogleIcon />
              <span className="text-[#5D717D] text-base">
                Login with Google
              </span>
            </span>
          </div>
          <div className="flex items-center justify-center w-full h-12 border border-[#CAD3D7] cursor-pointer rounded">
            <span className="flex gap-3 w-[185px]">
              <FacebookIcon />
              <span className="text-[#5D717D] text-base">
                Login with Facebook
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
