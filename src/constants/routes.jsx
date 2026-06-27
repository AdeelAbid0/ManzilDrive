export const ROUTES = {
  // Landing page routes
  LANDING: "/",
  DETAIL: "/detail",
  VIEWALLCARS: "/viewAll/:id",

  // Auth routes
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  //   VERIFY_OTP: "/verify-otp",
  //   PROFILE: "/profile",

  //PRIVATE ROUTES
  DASHBOARD: "/dashboard",
  POSTAD: "/postAd",
  EDITAD: "/editAd/:id",
  PROFILE: "/profile",

  // EVENTS ROUTES (private - user's own events)
  EVENTS: "/events",
  CREATE_EVENT: "/create-event",
  EDIT_EVENT: "/edit-event/:id",
  EVENT_DETAIL: "/event-detail/:id",

  // PUBLIC EVENTS ROUTES
  PUBLIC_EVENTS: "/events-listing",
  PUBLIC_EVENT_DETAIL: "/events-listing/:id",

  // ADMIN EVENTS ROUTE
  ADMIN_EVENTS: "/admin-events",

  // ADMIN ROUTES
  DASHBOARD_ADMIN: "/dashboard-admin",
  LIST_ADS: "/list-ads",
  BOOST_ADS: "/boost-ads",
  LANDING_PAGE: "/landing-page",
  EDIT_AD: "/admin/edit-ad",
};
