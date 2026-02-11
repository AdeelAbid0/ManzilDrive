import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { validationSchema } from "./Form/editad.schema";
import { initialValues } from "./Form/editad.initial";
import CarDetailForm from "../PostAdd/Components/CarDetailForm";
import {
  useGetAllMakes,
  useGetAllmodelByMake,
  useGetAllVariantsBymodel,
} from "./hooks/EditadApi";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import ImageUpload from "../PostAdd/Components/ImageUpload";
import PrimaryButton from "../../Common/Button/Button";

const EditAd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carData = location.state?.carData;
  const { id } = useParams();
  console.log({ carData });
  const [initialModelsLoaded, setInitialModelsLoaded] = useState(false);
  const [initialVariantsLoaded, setInitialVariantsLoaded] = useState(false);
  const [images, setImages] = useState(Array(6).fill(null));

  const formatCarData = (data) => {
    if (!data) return initialValues;

    return {
      make: data.make?._id || "",
      model: data.model?._id || "",
      variant: data.variant?._id || "",
      year: data.year?.toString() || "",
      rentPerDay: data.rentPerDay?.toString() || "",
      description: data.description || "",
      availability: data.availability || "",
      transmission: data.transmission || "",
      acheater: data.acheater ? "AC / Heater installed" : "None",
      seats: data.seats?.toString() || "",
      photos:
        data.photos?.map((photo) => ({
          preview: photo,
          name: photo.split("/").pop(),
        })) || [],
    };
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formatCarData(carData),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      // TODO: Add API call to update car with images
    },
  });

  // Initialize images when carData is available
  useEffect(() => {
    if (carData?.photos?.length) {
      setImages((prev) => {
        const newImages = [...prev];
        carData.photos.forEach((photo, index) => {
          if (index < 6) {
            newImages[index] = photo;
          }
        });
        return newImages;
      });
    }
  }, [carData]);

  const { data: makesData, isLoading: isLoadingMakes } = useGetAllMakes();

  const {
    data: modelsData,
    isLoading: isLoadingModels,
    refetch: refetchModels,
  } = useGetAllmodelByMake(formik.values.make, {
    enabled: !!formik.values.make,
  });

  const {
    data: variantData,
    isLoading: isLoadingVariants,
    refetch: refetchVariants,
  } = useGetAllVariantsBymodel(formik.values.model, {
    enabled: !!formik.values.model,
  });

  useEffect(() => {
    if (carData?.make?._id && !initialModelsLoaded) {
      formik.setFieldValue("make", carData.make._id);
      setTimeout(() => {
        refetchModels();
        setInitialModelsLoaded(true);
      }, 100);
    }
  }, [carData]);

  useEffect(() => {
    if (carData?.model?._id && initialModelsLoaded && !initialVariantsLoaded) {
      formik.setFieldValue("model", carData.model._id);
      setTimeout(() => {
        refetchVariants();
        setInitialVariantsLoaded(true);
      }, 100);
    }
  }, [carData, initialModelsLoaded]);

  useEffect(() => {
    if (carData?.variant?._id && initialVariantsLoaded && variantData?.data) {
      formik.setFieldValue("variant", carData.variant._id);
    }
  }, [carData, initialVariantsLoaded, variantData]);

  useEffect(() => {
    if (formik.values.make && initialModelsLoaded) {
      formik.setFieldValue("model", "");
      formik.setFieldValue("variant", "");
    }
  }, [formik.values.make]);

  useEffect(() => {
    if (formik.values.model && initialVariantsLoaded) {
      formik.setFieldValue("variant", "");
    }
  }, [formik.values.model]);

  if (!carData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-2 w-full mb-8 gap-6">
      <div className="w-full md:max-w-[766px] md:w-[64%] md:mt-6 p-4 md:p-0 space-y-6">
        {/* Car Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Car Details</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <CarDetailForm
              formik={formik}
              data={makesData}
              modelsData={modelsData}
              variantData={variantData}
              isEditMode={true}
              isLoadingModels={isLoadingModels}
              isLoadingVariants={isLoadingVariants}
            />
          </form>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Car Images</h2>
          <ImageUpload images={images} setImages={setImages} />
        </div>

        {/* Buttons Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              onClick={() => navigate("/dashboard")}
              className="w-full px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md"
            />
            <PrimaryButton
              type="submit"
              label="Save Changes"
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAd;
