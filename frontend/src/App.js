import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectUserType from "./pages/SelectUserType";
import IITGForm from "./pages/IITGForm";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectUserType />} />
        <Route path="/iitg" element={<IITGForm />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
