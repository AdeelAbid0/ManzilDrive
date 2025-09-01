import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "./store/store";
const queryClient = new QueryClient();
const loader = document.getElementById("loader");
if (loader) loader.remove();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
            <App />
          </PrimeReactProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
