// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.
// If you theft this code, you will be punished or may face legal action by the owner.

//src/main.jsx


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import './index.css';    // ✅ Must exist at /src/index.css
import './App.css';      // ✅ Must exist at /src/App.css
import 'react-toastify/dist/ReactToastify.css'; // ✅ Required for toast notifications

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
