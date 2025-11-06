import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import FormPage from "./views/FormPage";
import SuccessPage from "./views/SuccessPage";
import RulesPage from "./views/RulesPage";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<LandingPage />} />{" "}
        <Route path="/form" element={<FormPage />} />{" "}
        <Route path="/success" element={<SuccessPage />} />{" "}
        <Route path="/rules" element={<RulesPage />} />{" "}

      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App
