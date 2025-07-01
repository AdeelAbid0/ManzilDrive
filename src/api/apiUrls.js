export const ApiUrl = {
  Auth: {
    Register: "business/register",
    Login: "auth/login",
    VerifyEmail: "business/verify-email",
    ResendEmailVerification: "business/resend-email-verification",
    VerifyPhone: "business/verify-phone",
    SendPhoneVerification: "business/send-phone-verification",
  },

  Business: {
    ApproveBusiness: (businessId) => `business/approve/${businessId}`,
    GetAllActiveBusiness: (isApproved) =>
      `business/all-active?isApproved=${isApproved}`,
  },

  Vehicle: {
    AddVehicle: "cars/addcar",
    UpdateAvailability: (carId) => `cars/${carId}/availability`,
    ApprovePost: (carId) => `cars/${carId}/approve`,
    GetAllCars: (page = 1, limit = 5) =>
      `cars/cars?page=${page}&limit=${limit}`,
    AddPostDuration: "postDuration/car-post-duration",
    LocationSuggestion: (locationInput) =>
      `cars/location-suggestions?locationInput=${locationInput}`,
  },

  City: {
    AddCity: "cities",
    UpdateStatus: (cityId) => `cities/${cityId}/status`,
    GetAllByCountryId: (countryId) => `cities/by-country/${countryId}`,
    GetAllActiveByCountryId: (countryId) =>
      `cities/active/by-country/${countryId}`,
  },

  Country: {
    AddCountry: "countries",
    ChangeStatus: (countryId) => `countries/${countryId}/status`,
    GetAllCountries: "countries",
    GetAllActiveCountries: "countries/active",
  },

  Makes: {
    CreateCarMake: "car-makemodel/",
    GetAllMakes: "car-makemodel/allMakes",
    GetAllActiveMakes: (makes) => `car-makemodel/active-makes?=${makes}`,
    SetMakeStatus: (makeId) => `car-makemodel/${makeId}/set-status`,
  },

  Models: {
    GetAllModelsByMake: (makeId) => `car-makemodel/${makeId}/allmodels`,
    SetModelStatus: (modelId) => `car-makemodel/models/${modelId}/set-status`,
    AddMakeModel: (makeId) => `car-makemodel/${makeId}/add-model`,
    ActiveModelByMake: (makeId) => `car-makemodel/${makeId}/active-models`,
  },
};
