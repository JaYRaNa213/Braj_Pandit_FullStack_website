import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx"; // your main App component with routes
import { AuthProvider } from "./context/AuthContext.jsx";

import "./index.css"; // Tailwind and styles
import "./App.css";    // your custom app styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      
        <App />
      
    </AuthProvider>
  </React.StrictMode>
);
