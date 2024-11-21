import React from "react";
import { createRoot } from "react-dom/client";

// import App from "./App";
import App from "./Appnew";

import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "./Main.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

reportWebVitals();
