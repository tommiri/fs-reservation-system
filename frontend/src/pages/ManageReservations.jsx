import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../components/Modal";

const darkBackground = "#262626";
const formBackground = "#333";
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
const Card = styled.div`
  background-color: ${formBackground};
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px;
  margin-top: 20px;
  box-shadow: 0 0 10px 0 #00000060;
`;
const StyledInput = styled.input`
  background-color: ${formBackground};
  color: ${textColor};
  border: none;
  border-bottom: 1px solid ${textColor};
  margin: 10px 0;
  padding: 10px 0;
  font-size: 16px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const StyledButton = styled.button`
  background-color: ${formBackground};
  color: ${textColor};
  border: none;
  padding: 10px 0;
  margin: 20px 0 0;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    background-color: #444;
  }
`;

export default function ManageReservations() {
  const [reservationDetails, setReservationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState({
    show: false,
    modalType: "",
  });

  const showModal = (modalType) => {
    setModal({
      show: true,
      modalType,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reservationCode = event.target.elements[0].value;

    if (!reservationCode) {
      setError("Please enter a reservation code");
      return;
    }
    try {
      setIsLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/reservations/${reservationCode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reservation details");
      }
      const data = await response.json();
      setReservationDetails(data);
      setError("");
    } catch (error) {
      console.error("Error fetching reservation:", error);
      setError("Failed to fetch reservation details. Please try again.");
      setReservationDetails(null);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <ToastContainer />
      <p>95678dc8-81bc-4f2e-9e1d-e32c0aacc9f5</p>
      <h2>Manage Reservations</h2>
      <form onSubmit={handleSubmit}>
        <Card>
          <p>Enter reservation code to Edit:</p>
          <StyledInput type="text" placeholder="Reservation code" />
          <div style={{ alignSelf: "center", marginTop: 2 }}>
            {isLoading && <ClipLoader color="#36d7b7" />}
          </div>
          <StyledButton type="submit">Search</StyledButton>
        </Card>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reservationDetails && (
        <Card>
          <h3 style={{ marginBottom: 20 }}>Your reservation details:</h3>
          <span>
            <strong>Reservation Number:</strong>
            <p>{reservationDetails.reservation_number}</p>
          </span>
          <p>
            <strong>Name:</strong> {reservationDetails.customer_name}
          </p>
          <p>
            <strong>Email:</strong> {reservationDetails.customer_email}
          </p>
          <p>
            <strong>Number of Guests:</strong>{" "}
            {reservationDetails.customer_count}
          </p>
          <p>
            <strong>Date and Time:</strong>{" "}
            {new Date(reservationDetails.reservation_datetime).toLocaleString(
              "en-FI"
            )}
          </p>
          <h4 style={{ marginTop: 20 }}>
            Do you wish to edit or cancel the reservation?
          </h4>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                showModal("edit");
              }}
              style={{
                width: "5.5rem",
                background: "#448ECE",
                textAlign: "center",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                showModal("cancel");
              }}
              style={{
                width: "5.5rem",
                background: "#DC5751",
                textAlign: "center",
              }}
            >
              Cancel
            </button>
          </div>
        </Card>
      )}
      <Modal
        onHide={() => {
          setModal({ show: false, modalType: "" });
        }}
        show={modal.show}
        modalType={modal.modalType}
        reservationDetails={reservationDetails}
        toast={toast}
      />
    </Container>
  );
}
