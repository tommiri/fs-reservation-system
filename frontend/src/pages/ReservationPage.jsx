import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReservationForm from "../components/ReservationForm";

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
  const [formData, setFormData] = useState({
    selectedDate: new Date(),
    selectedTime: "",
    name: "",
    email: "",
    guests: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numberOfGuests = Number(formData.guests) || 1;

    const dateTime = new Date(formData.selectedDate);
    const [hours, minutes] = formData.selectedTime.split(":").map(Number);
    dateTime.setHours(hours, minutes, 0, 0);

    const ISODateTime = dateTime.toISOString();

    const reservationDetails = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_count: numberOfGuests,
      reservation_datetime: ISODateTime,
    };
    
    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationDetails),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setIsLoading(false);
      toast.success(
        `Reservation successful! Your reservation number is: ${result.reservation_number}`
      );
    } catch (error) {
      setIsLoading(false);
      console.error("There was a problem with the fetch operation:", error);
      toast.error("Failed to submit reservation. Please try again.");
    }
  };
  return (
    <Container>
      <ToastContainer />
      <h2>Table Reservation</h2>
      <ReservationForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        type="create"
        isLoading={isLoading}
      />
    </Container>
  );
};

export default ReservationPage;
