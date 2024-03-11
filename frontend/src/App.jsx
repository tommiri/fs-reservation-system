import React from "react";
import { Routes, Route } from "react-router-dom";

import FrontPage from "./pages/FrontPage";
import ReservationPage from "./pages/ReservationPage";
import ManagePage from "./pages/ManageReservations";
function App() {
  return (
    <>
      {/*<NavBar />*/}

      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </>
  );
}

export default App;
