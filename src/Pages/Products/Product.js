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
import Pagination from "../../Common/Pagination/Pagination";

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
  console.log("total page", allCarsData);
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex w-full md:flex-col flex-col-reverse">
        <HeroSection />
        <div className="flex justify-center w-full">
          <div className="flex items-center md:w-[90%] w-full h-[98px] md:h-[90px] md:rounded bg-search mt-0 md:mt-[-45px] md:pl-6 pl-3 md:pr-6 pr-3 relative">
            <div className="flex w-full">
              <InputText
                onClick={() => setShowSearchDialog(true)}
                placeholder="Search for vehicle here"
                className="font-inter font-normal text-input text-sm w-full h-[42px] rounded md:rounded-tr-[4px] md:rounded-br-[4px] rounded-tr-none rounded-br-none focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
              />
            </div>
            <div className="absolute right-[25px] flex justify-center items-center w-10 h-10 bg-primary rounded-tr-md rounded-br-md">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-6 md:mt-10">
        <h1 className="font-inter font-medium text-2xl leading-[100%] text-secondary">
          Rental Cars in Rawalpindi
        </h1>
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
        className={"!max-w-[450px] !w-[30%]"}
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
