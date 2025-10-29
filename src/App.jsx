import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import FormPage from "./views/FormPage";
import SuccessPage from "./views/SuccessPage";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<LandingPage />} />{" "}
        <Route path="/form" element={<FormPage />} />{" "}
        <Route path="/success" element={<SuccessPage />} />{" "}
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App
