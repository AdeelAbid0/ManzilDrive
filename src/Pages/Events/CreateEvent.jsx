import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { showNotification } from "../../slices/notificationSlice";
import PrimaryButton from "../../Common/Button";
import CommonInput from "../../Common/InputText";
import Loader from "../../Components/Loader/Loader";
import { Passengers, Service, AC } from "../../Utils/Icons";
import { ROUTES } from "../../constants/routes";
import { useCreateEvent, useUpdateEvent, useGetBusinessCarsForEvent } from "./hooks/EventsApi";

const validationSchema = Yup.object({
  name: Yup.string().required("Package name is required"),
  price: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Package price is required"),
});

const StepIndicator = ({ step }) => (
  <div className="flex items-center w-full mb-8">
    <div className="flex flex-col items-center">
      <div className={`flex items-center justify-center w-9 h-9 rounded-full font-semibold text-sm transition-all duration-300 ${step >= 1 ? "bg-primary text-white shadow-md" : "bg-[#E3E8EA] text-[#808080]"}`}>
        {step > 1 ? (
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : "1"}
      </div>
      <span className={`text-xs mt-1 font-medium ${step >= 1 ? "text-primary" : "text-[#808080]"}`}>Package Info</span>
    </div>
    <div className={`flex-1 h-[2px] mx-3 transition-all duration-300 ${step >= 2 ? "bg-primary" : "bg-[#E3E8EA]"}`} />
    <div className="flex flex-col items-center">
      <div className={`flex items-center justify-center w-9 h-9 rounded-full font-semibold text-sm transition-all duration-300 ${step >= 2 ? "bg-primary text-white shadow-md" : "bg-[#E3E8EA] text-[#808080]"}`}>
        2
      </div>
      <span className={`text-xs mt-1 font-medium ${step >= 2 ? "text-primary" : "text-[#808080]"}`}>Select Cars</span>
    </div>
  </div>
);

const CarSelectCard = ({ car, selected, isMain, onClick }) => {
  const selectedMain = selected && isMain;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col rounded-xl border-2 cursor-pointer transition-all duration-200 overflow-hidden ${selected ? "border-primary shadow-[0_0_0_3px_#00796B20]" : "border-[#E3E8EA] bg-white hover:border-[#B8CBCF] hover:shadow-sm"} bg-white`}
    >
      <div className={`w-full h-[130px] relative ${selectedMain ? "bg-[#00796B0D]" : "bg-[#F4F7F8]"}`}>
        <img
          className="w-full h-full object-contain p-3"
          src={car?.photos?.[0]}
          alt={car?.make?.name}
          onError={(e) => { e.target.src = "/Car.png"; }}
        />
        {selectedMain && (
          <div className="absolute top-[6px] left-[6px] flex items-center gap-1 bg-primary text-white text-[10px] font-bold px-[8px] py-[4px] rounded-full shadow-md z-10">
            <svg width="8" height="8" viewBox="0 0 12 12" fill="white">
              <path d="M6 1l1.4 3h3.1l-2.5 1.9.9 3.1L6 7.5l-2.9 1.5.9-3.1L1.5 4h3.1z" />
            </svg>
            MAIN
          </div>
        )}
        {selected && (
          <div className="absolute top-[6px] right-[6px] w-6 h-6 rounded-full bg-primary border-2 border-white flex items-center justify-center shadow-md z-10">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col px-3 pt-[10px] pb-3 gap-[6px]">
        <p className="font-inter font-semibold text-[13px] leading-[17px] text-secondary truncate">
          {car?.make?.name} {car?.variant?.name} {car?.year}
        </p>
        <p className="font-inter font-bold text-[14px] leading-none text-secondary">
          Rs {car?.rentPerDay?.toLocaleString()}
          <span className="font-normal text-[10px] text-[#6383A6] ml-1">/day</span>
        </p>
        <div className="flex items-center gap-[5px] flex-wrap pt-[2px]">
          <span className="flex items-center gap-[3px] text-[10px] text-primarygrey"><Passengers />{car?.seats}</span>
          <span className="text-[#D0D0D0]">·</span>
          <span className="flex items-center gap-[3px] text-[10px] text-primarygrey">
            <Service />{car?.transmission === "automatic" ? "Auto" : "Manual"}
          </span>
          <span className="text-[#D0D0D0]">·</span>
          <span className="flex items-center gap-[3px] text-[10px] text-primarygrey">
            <AC />{car?.acheater ? "A/C" : "No A/C"}
          </span>
        </div>
      </div>
    </div>
  );
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const user = useSelector((state) => state.user.user);
  const businessId = user?.business?._id;

  const editingEvent = location.state?.event;
  const isEdit = !!editingEvent;

  const [step, setStep] = useState(1);
  const [selectedMainCar, setSelectedMainCar] = useState(editingEvent?.mainCar || null);
  const [selectedFleetCars, setSelectedFleetCars] = useState(editingEvent?.fleetCars || []);

  const { data: carsData, isPending: carsLoading } = useGetBusinessCarsForEvent(businessId);
  const { mutate: createEvent, isPending: isCreating } = useCreateEvent();
  const { mutate: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const myFleet = carsData?.data || carsData?.cars || [];
  const isSubmitting = isCreating || isUpdating;

  const formik = useFormik({
    initialValues: {
      name: editingEvent?.name || "",
      price: editingEvent?.pricePerPackage || "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      formik.setTouched({ name: true, price: true });
      if (Object.keys(errors).length === 0) {
        setStep(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  const handleSubmit = () => {
    if (!selectedMainCar) {
      dispatch(showNotification({ message: "Please select a main car", status: "error" }));
      return;
    }

    const payload = {
      name: formik.values.name,
      pricePerPackage: Number(formik.values.price),
      mainCarId: selectedMainCar._id,
      fleetCarIds: selectedFleetCars.map((c) => c._id),
    };

    if (isEdit) {
      updateEvent(
        { suffixUrl: editingEvent._id, ...payload },
        {
          onSuccess: () => {
            dispatch(showNotification({ message: "Package updated successfully", status: "success" }));
            queryClient.invalidateQueries({ queryKey: ["getMyEvents"] });
            navigate(ROUTES.EVENTS);
          },
          onError: (err) => {
            dispatch(showNotification({ message: err?.message || "Update failed", status: "error" }));
          },
        },
      );
    } else {
      createEvent(payload, {
        onSuccess: () => {
          dispatch(showNotification({ message: "Package created. Awaiting admin approval.", status: "success" }));
          queryClient.invalidateQueries({ queryKey: ["getMyEvents"] });
          navigate(ROUTES.EVENTS);
        },
        onError: (err) => {
          dispatch(showNotification({ message: err?.message || "Create failed", status: "error" }));
        },
      });
    }
  };

  const fleetOptions = useMemo(
    () => myFleet.filter((car) => car._id !== selectedMainCar?._id),
    [myFleet, selectedMainCar],
  );

  const toggleFleetCar = (car) => {
    setSelectedFleetCars((prev) =>
      prev.some((c) => c._id === car._id)
        ? prev.filter((c) => c._id !== car._id)
        : [...prev, car],
    );
  };

  return (
    <div className="flex flex-col items-center mt-2 w-full mb-8 gap-4 px-4 md:px-0">
      <div className="w-full md:max-w-[720px] md:w-[60%] mt-4 md:mt-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => (step === 2 ? setStep(1) : navigate(ROUTES.EVENTS))}
            className="flex items-center justify-center w-8 h-8 border border-[#E3E8EA] rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="#5D717D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="font-semibold text-lg text-[#1A1A1A]">
              {isEdit ? "Edit Package" : "Create Event Package"}
            </h1>
            <p className="text-sm text-[#808080]">
              {step === 1 ? "Enter package details" : "Select the cars for this package"}
            </p>
          </div>
        </div>

        <StepIndicator step={step} />

        {/* STEP 1: Package Info */}
        {step === 1 && (
          <div className="flex flex-col gap-5 p-6 border border-[#EDEDED] rounded-xl bg-white">
            <div>
              <label className="block text-sm font-medium text-[#4D4D4D] mb-[6px]">
                Package Name <span className="text-red-500">*</span>
              </label>
              <CommonInput
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. Shadi Barat Package, Eid Special"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4D4D4D] mb-[6px]">
                Package Price (Rs) <span className="text-red-500">*</span>
              </label>
              <CommonInput
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. 6000"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
              )}
              <p className="text-xs text-[#808080] mt-1">Total price for the complete package (all cars included)</p>
            </div>

            {formik.values.name && formik.values.price && (
              <div className="border border-[#00796B26] bg-[#00796B08] rounded-xl p-4">
                <p className="text-xs text-[#808080] font-medium uppercase tracking-wide mb-2">Preview</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-[#4D4D4D]">{formik.values.name}</p>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">Rs {Number(formik.values.price).toLocaleString()}</p>
                    <p className="text-[10px] text-[#808080]">complete package</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Car Selection */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            {carsLoading ? (
              <div className="flex justify-center py-16"><Loader /></div>
            ) : myFleet.length === 0 ? (
              <div className="p-6 border border-[#EDEDED] rounded-xl bg-white text-center">
                <p className="text-[#808080] text-sm">No approved cars found in your fleet.</p>
                <p className="text-[#808080] text-xs mt-1">Please add and get a car approved first before creating an event package.</p>
              </div>
            ) : (
              <>
                {/* Main Car */}
                <div className="p-5 border border-[#EDEDED] rounded-xl bg-[#fafafa]">
                  <div className="mb-4">
                    <h2 className="font-semibold text-sm text-[#4D4D4D]">
                      Main Car{" "}
                      <span className="text-[#808080] font-normal">(premium / lead vehicle)</span>
                      {!selectedMainCar && <span className="text-red-400 ml-1">· Required</span>}
                    </h2>
                    <p className="text-xs text-[#808080] mt-1">Select only one car as the main vehicle for this package.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {myFleet.map((car) => (
                      <CarSelectCard
                        key={car._id}
                        car={car}
                        selected={selectedMainCar?._id === car._id}
                        isMain
                        onClick={() => {
                          setSelectedMainCar(car);
                          setSelectedFleetCars((prev) => prev.filter((c) => c._id !== car._id));
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Additional Cars */}
                <div className="p-5 border border-[#EDEDED] rounded-xl bg-[#fafafa]">
                  <div className="mb-4">
                    <h2 className="font-semibold text-sm text-[#4D4D4D]">
                      Additional Cars{" "}
                      <span className="text-[#808080] font-normal">(supporting fleet)</span>
                      {selectedFleetCars.length > 0 && (
                        <span className="text-primary ml-1 font-medium">· {selectedFleetCars.length} selected</span>
                      )}
                    </h2>
                    <p className="text-xs text-[#808080] mt-1">You can select multiple cars to include in the supporting fleet.</p>
                    <p className="text-xs text-[#808080] mt-1">
                      To add more cars,{" "}
                      <button
                        type="button"
                        onClick={() => navigate(ROUTES.POSTAD)}
                        className="text-primary font-medium underline underline-offset-2 hover:opacity-80"
                      >
                        post an ad
                      </button>{" "}
                      — only approved cars will appear here.
                    </p>
                  </div>
                  {fleetOptions.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {fleetOptions.map((car) => (
                        <CarSelectCard
                          key={car._id}
                          car={car}
                          selected={selectedFleetCars.some((c) => c._id === car._id)}
                          onClick={() => toggleFleetCar(car)}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[#808080] text-center py-6">
                      Select a main car first to see remaining fleet options.
                    </p>
                  )}
                </div>

                {/* Summary */}
                {selectedMainCar && (
                  <div className="p-5 border border-[#00796B26] rounded-xl bg-[#00796B08]">
                    <p className="text-xs text-[#808080] font-semibold uppercase tracking-wide mb-3">Package Summary</p>
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-semibold text-sm text-[#4D4D4D]">{formik.values.name}</p>
                      <p className="font-bold text-lg text-primary">Rs {Number(formik.values.price).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs text-[#4D4D4D]">
                        <span className="w-2 h-2 rounded-full bg-[#FF9800] shrink-0" />
                        <span className="font-medium">{selectedMainCar.make?.name} {selectedMainCar.variant?.name} {selectedMainCar.year}</span>
                        <span className="text-[#808080]">(Main)</span>
                      </div>
                      {selectedFleetCars.map((car) => (
                        <div key={car._id} className="flex items-center gap-2 text-xs text-[#666666]">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span>{car.make?.name} {car.variant?.name} {car.year}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#00796B26] flex items-center justify-between text-xs text-[#808080]">
                      <span>Total cars</span>
                      <span className="font-semibold text-[#4D4D4D]">{1 + selectedFleetCars.length} cars</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-center w-full px-4 md:px-0 mt-2">
        <div className="flex justify-between w-full md:max-w-[720px] md:w-[60%] gap-4">
          {step === 2 && (
            <Button
              label="Back"
              onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="bg-transparent border border-primary text-primary flex justify-center items-center w-full h-[48px] hover:bg-blue-50 transition-colors"
            />
          )}
          <div className="w-full">
            {step === 1 ? (
              <PrimaryButton type="button" label="Next →" onClick={handleNext} />
            ) : (
              <PrimaryButton
                type="button"
                label={isSubmitting ? "Saving..." : isEdit ? "Update Package" : "Create Package"}
                loading={isSubmitting}
                onClick={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
