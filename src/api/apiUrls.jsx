export const ApiUrl = {
  Auth: {
    Register: "business/register",
    Login: "auth/login",
    GoogleLogin: "auth/google-login",
    refreshToken: "auth/refresh-token",
    sendEmailVerficationCode: "business/sendEmailVerficationCode",
    ResendEmailVerification: "business/resend-email-verification",
    VerifyPhone: "business/verify-phone",
    SendPhoneVerification: "business/resend-phone-verification",
    verifyEmailOtp: "business/verfiyPhoneUserEmailVerificationCode",
    ResetPassword: "/auth/reset-password",
  },
  Dashboard: {
    GetAllCars: () => "cars/getAllCarsOfBusiness",
    GetAdsCount: (businessId) =>
      `cars/getBusinessAdsCount?businessId=${businessId}`,
    BoostAd: () => "cars/boostAd",
    DeleteAd: () => "/cars/deleteAd",
    GetCarDetails: (carId) => `cars/getCarDetails/${carId}`,
  },
  Profile: {
    UpdateProfile: "business/update",
  },
  Business: {
    GetBusinessDetail: (businessId) =>
      `business/getBusinessById?id=${businessId}`,
    ApproveBusiness: (businessId) => `business/approve/${businessId}`,
    AddBusiness: "business/update",
    GetAllActiveBusiness: (isApproved) =>
      `business/all-active?isApproved=${isApproved}`,
    VerifyPhone: "business/verifyPhoneNumber",
    sendOTP: "business/sendPhoneVerificationCode",
  },

  Vehicle: {
    AddVehicle: "cars/addcar",
    UpdateVehicle: "cars/updateCar",
    UpdateAvailability: "/cars/availability",
    ApprovePost: (carId) => `cars/${carId}/approve`,
    GetAllCars: () => `cars/cars`,
    AddPostDuration: "postDuration/car-post-duration",
    GetAllCarsByBusiness: () => `cars/getAllCarsOfBusiness`,
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
  Location: {
    GetLocation: ({ input, sessionToken }) =>
      `places/autocomplete?input=${input}&sessionToken=${sessionToken}`,
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
    GetAllActiveMakes: () => `car-makemodel/active-makes`,
    SetMakeStatus: (makeId) => `car-makemodel/${makeId}/set-status`,
  },

  Models: {
    GetAllModelsByMake: (makeId) => `car-makemodel/${makeId}/allmodels`,
    SetModelStatus: (modelId) => `car-makemodel/models/${modelId}/set-status`,
    AddMakeModel: (makeId) => `car-makemodel/${makeId}/add-model`,
    ActiveModelByMake: (makeId) => `car-makemodel/${makeId}/active-models`,
  },
  Variant: {
    GetVariantBymodel: (modelId) =>
      `car-makemodel/variantby-model?modelId=${modelId}`,
  },

  // Admin side Apis
  AdminDashboard: {
    GetAllBusinesses: (page, limit) =>
      `business/adminGetAllBusinesses?page=${page}&limit=${limit}`,
    GetAdsCount: () => "cars/getAdminCarStatusCount",
    //Businesses
    ApproveBusiness: () => "business/approve",
    RejectBusiness: () => "business/rejectBusiness",
    // Ads list
    GetAllAds: () => "cars/getAdminAllCars",
  },
  BoostAds: {
    GetAllBoostAdsRequest: (page, limit, status, tab) =>
      `cars/carBoostedRequests?page=${page}&limit=${limit}&status=${status}&tab=${tab}`,
    RejectBoostRequest: () => "cars/rejectCarBoost",
    ApproveBoostRequest: () => "cars/approveCarBoost",
  },
  AdsList: {
    GetAllAds: () => "cars/getAdminAllCars",
    ApproveAd: () => "cars/approve",
    RejectAd: () => "cars/reject",
  },
};
