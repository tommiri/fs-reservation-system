import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const CancelLayout = ({ onHide, props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelReservation = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const reservationID = props.reservationDetails.reservation_number;
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/reservations/${reservationID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsLoading(false);
        props.toast.success("Reservation cancelled successfully");
        onHide();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error cancelling reservation:", error);
      props.toast.error("Failed to cancel reservation");
    }
  };

  const header = (
    <div>
      <h2>Cancel Reservation?</h2>
    </div>
  );

  const body = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p>Are you sure you want to cancel this reservation?</p>
      <div style={{ alignSelf: "center" }}>
        {isLoading && <ClipLoader color="#36d7b7" />}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 10,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleCancelReservation}
          style={{
            width: "5.5rem",
            background: "#448ECE",
            textAlign: "center",
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            onHide();
          }}
          style={{
            width: "5.5rem",
            background: "#DC5751",
            textAlign: "center",
          }}
        >
          No
        </button>
      </div>
    </div>
  );

  return { header, body };
};

export default CancelLayout;
