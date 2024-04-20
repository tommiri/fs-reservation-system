import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ManageReservations from "./ManageReservations";

describe("ManageReservations", () => {
  it("renders correctly", () => {
    render(<ManageReservations />);
    expect(screen.getByText("Manage Reservations")).toBeInTheDocument();
  });

  it("handles fetch error", async () => {
    render(<ManageReservations />);

    fireEvent.change(screen.getByPlaceholderText(/RESERVATION CODE/i), {
      target: { value: "1234" },
    });
    fireEvent.click(screen.getByRole("button", { name: /SEARCH/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to fetch reservation details. Please try again."
        )
      ).toBeInTheDocument();
    });
  });

  it("fetches reservation details", async () => {
    render(<ManageReservations />);

    fireEvent.change(screen.getByPlaceholderText(/RESERVATION CODE/i), {
      target: { value: "056b5cfe-3b59-413c-b518-5f31aad36d7e" },
    });
    fireEvent.click(screen.getByRole("button", { name: /SEARCH/i }));

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.queryByText(
          "Failed to fetch reservation details. Please try again."
        )
      ).not.toBeInTheDocument();
    });
  });
});
