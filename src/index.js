import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./hooks/ContextApi";
import { FirebaseProvider } from "./hooks/context/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </ThemeProvider>
  </React.StrictMode>
);
