import React, { useState } from "react";
import ReservationForm from "../ReservationForm";

const EditLayout = ({ props }) => {
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

    const apiUrl = import.meta.env.VITE_API_URL;
    const reservationID = props.reservationDetails.reservation_number;
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/reservations/${reservationID}`, {
        method: "PUT",
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
      props.toast.success(
        `Reservation updated successfully! Your reservation number is: ${result.reservation_number}`
      );
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating reservation:", error);
      props.toast.error("Failed to update reservation");
    }
  };

  const header = (
    <div>
      <h2>Edit Reservation</h2>
    </div>
  );

  const body = (
    <ReservationForm
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      type="edit"
      isLoading={isLoading}
    />
  );

  return { header, body };
};

export default EditLayout;
