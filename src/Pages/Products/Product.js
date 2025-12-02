import { useState } from "react";
import { InputText } from "primereact/inputtext";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ProductsList from "./Components/ProductsList/ProductsList";
import { useFormik } from "formik";
import { initialValues } from "./Form/Poducts.initail";
import { useGetAllCars } from "./hooks/ProductsApi";
import CommonDialog from "../../Common/Dialog/CommonDialog";
import SearchDialog from "./Components/SearchDialog/SearchDialog";

const Products = () => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {},
  });

  // ✅ Cars API
  const { data: allCarsData, isPending: LoadingCarsData } = useGetAllCars();
  const handleChange = (e) => {
    formik.setFieldValue("location", e.value);
  };

  return (
    <div className="flex flex-col items-center h-auto">
      <div className="flex w-full md:flex-col flex-col-reverse">
        <HeroSection />
        <div className="flex justify-center w-full">
          <div className="flex items-center md:w-[90%] w-full h-[98px] md:h-[90px] md:rounded bg-search mt-0 md:mt-[-45px] md:pl-6 pl-3 md:pr-6 pr-3 md:gap-4">
            <div className="flex w-full">
              <InputText
                onClick={() => setShowSearchDialog(true)}
                placeholder="Search for vehicle here"
                className="font-inter font-normal text-input text-sm w-full h-[42px] rounded md:rounded-tr-[4px] md:rounded-br-[4px] rounded-tr-none rounded-br-none focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-6 md:mt-10">
        <h1 className="font-inter font-medium text-2xl leading-[100%] text-secondary">
          Rental Cars in Rawalpindi
        </h1>
      </div>

      <div className="flex w-full justify-center">
        <ProductsList allCarsData={allCarsData} />
      </div>

      <CommonDialog
        open={showSearchDialog}
        onClose={() => {
          setShowSearchDialog(false);
        }}
        className={"!max-w-[450px] !w-[30%]"}
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <SearchDialog />
        </div>
      </CommonDialog>
    </div>
  );
};

export default Products;
