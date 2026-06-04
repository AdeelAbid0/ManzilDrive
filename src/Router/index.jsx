import { LANDINGPAGE_ROUTES, AUTH_ROUTES, PRIVATE_ROUTES } from "./routes";

export const appRoutes = [
  ...LANDINGPAGE_ROUTES,
  ...AUTH_ROUTES,
  ...PRIVATE_ROUTES,
];
