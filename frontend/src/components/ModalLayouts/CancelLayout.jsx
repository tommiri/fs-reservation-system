import React from "react";

const CancelLayout = ({ onHide, props }) => {
  const handleCancelReservation = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const reservationID = props.reservationDetails.reservation_number;
    try {
      const response = await fetch(`${apiUrl}/reservations/${reservationID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        props.toast.success("Reservation cancelled successfully");
        onHide()
      } else {
        props.toast.error("Failed to cancel reservation");
      }
    } catch (error) {
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
    <div>
      <p>Are you sure you want to cancel this reservation?</p>
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
