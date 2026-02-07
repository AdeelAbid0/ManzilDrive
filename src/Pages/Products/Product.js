import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ProductsList from "./Components/ProductsList/ProductsList";
import { useFormik } from "formik";
import { initialValues } from "./Form/Poducts.initail";
import { useGetAllCars } from "./hooks/ProductsApi";
import CommonDialog from "../../Common/Dialog/CommonDialog";
import SearchDialog from "./Components/SearchDialog/SearchDialog";
import { ReactComponent as SearchIcon } from "../../assets/SVG/search.svg";

const Products = () => {
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [allCarsData, setAllCarsData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    onSubmit: (values) => {
      getAllActiveAdds(values);
    },
  });

  const { mutate: getAllCarsData, isPending: LoadingCarsData } =
    useGetAllCars();

  const handleChange = (e) => {
    formik.setFieldValue("location", e.value);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getAllActiveAdds = () => {
    const filters = {
      page: page,
      limit: formik.values.limit,
      make: formik.values.make,
      model: formik.values.model,
      variant: formik.values.variant,
      status: formik.values.status,
      year: formik.values.year,
      location: formik.values.location,
      transmission: Array.isArray(formik.values.transmission)
        ? formik.values.transmission
        : [],
      availability: Array.isArray(formik.values.availability)
        ? formik.values.availability
        : [],
      category: Array.isArray(formik.values.category)
        ? formik.values.category
        : [],
    };
    getAllCarsData(filters, {
      onSuccess: (res) => {
        setTotalPages(res?.totalPages);
        setAllCarsData(res?.cars);
      },
      onError: (error) => {
        console.error("Error fetching cars:", error);
      },
    });
  };
  useEffect(() => {
    formik.submitForm();
  }, []);
  return (
    <div className="flex w-full flex-col items-center h-full bg-[#EDEDED]">
      <div className="flex w-full md:flex-col flex-col-reverse">
        <HeroSection />
        <div className="flex justify-center w-full">
          <div className="flex items-center md:max-w-[424px] md:w-[90%] w-full md:rounded bg-search mt-0 md:mt-[-45px] px-3 py-3 relative">
            <div className="flex w-full">
              <InputText
                onClick={() => setShowSearchDialog(true)}
                placeholder="Find cars near you"
                className="!font-inter font-normal text-input text-sm w-full h-[44px] shadow-inner rounded-[4px] md:rounded-br-[4px]  focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
              />
            </div>
            <div className="absolute right-[14px] md:right-[14px] flex justify-center items-center w-10 h-[42px] bg-primary rounded-tr-md rounded-br-md">
              <SearchIcon className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        <ProductsList
          allCarsData={allCarsData}
          formik={formik}
          handleSearch={getAllActiveAdds}
          LoadingCarsData={LoadingCarsData}
          page={page}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>

      <CommonDialog
        open={showSearchDialog}
        onClose={() => {
          setShowSearchDialog(false);
        }}
        className={
          "md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
        }
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <SearchDialog
            formik={formik}
            handleSearch={getAllActiveAdds}
            setShowSearchDialog={setShowSearchDialog}
          />
        </div>
      </CommonDialog>
    </div>
  );
};

export default Products;
