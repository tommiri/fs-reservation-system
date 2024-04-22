import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import ReservationForm from "../components/ReservationForm"; // Importing ReservationForm component

const darkBackground = "#262626";
const textColor = "#FFF";

const Container = styled.div`
  background-color: ${darkBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 200vh;
  color: ${textColor};
  margin-top: 60px;
`;

const ReservationPage = () => {
  return (
    <Container>
      <ToastContainer />
      <h2>Table Reservation</h2>
      <ReservationForm /> {/* Render ReservationForm component */}
    </Container>
  );
};

export default ReservationPage;
