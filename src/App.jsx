import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import FormPage from "./views/FormPage";
import SuccessPage from "./views/SuccessPage";
import RulesPage from "./views/RulesPage";
import SubmissionsPage from "./views/SubmissionsPage";
import EventPhotosPage from "./views/EventPhotosPage";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/event-photos" element={<EventPhotosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
