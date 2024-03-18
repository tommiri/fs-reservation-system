export default function ManageReservations() {
  return (
    <div>
      <h1>Manage Reservations</h1>

      <p>Enter reservation code to Edit</p>
      <input type="text" placeholder="Reservation code" />
      <button
        onClick={() => {
          alert("meow :3");
        }}
      >
        Search
      </button>
    </div>
  );
}
