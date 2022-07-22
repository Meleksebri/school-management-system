import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:4000";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </HelmetProvider>
);
