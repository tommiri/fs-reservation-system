import React from "react";
import EditLayout from "./ModalLayouts/EditLayout";
import CancelLayout from "./ModalLayouts/CancelLayout";

const Modal = ({ onHide, show, modalType, ...props }) => {
  if (!show) {
    return null;
  }

  let modalContent;
  switch (modalType) {
    case "edit":
      modalContent = EditLayout({ props });
      break;
    case "cancel":
      modalContent = CancelLayout({ onHide, props });
      break;
    default:
      break;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        overflowY: "auto",
        height: "100%",
        width: "100%",
      }}
      onClick={onHide}
    >
      <div
        style={{
          position: "relative",
          top: "80px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "2rem",
          border: "1px solid #e5e7eb",
          maxWidth: "36rem",
          boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
          borderRadius: "0.375rem",
          backgroundColor: "#262626",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #e5e7eb",
            paddingBottom: "0.5rem",
          }}
        >
          <h5
            style={{
              fontSize: "1.25rem",
              fontWeight: "200",
              color: "#ffffff",
              marginBottom: "1rem",
            }}
          >
            {modalContent.header}
          </h5>
          <button
            style={{
              color: "#9CA3AF",
              backgroundColor: "transparent",
              borderRadius: "0.375rem",
              padding: "0.375rem 0.75rem",
              fontSize: "0.875rem",
              display: "inline-flex",
              alignItems: "center",
            }}
            onClick={onHide}
          >
            <svg
              style={{ width: "1.25rem", height: "1.25rem" }}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {modalContent.body}
        </div>
      </div>
    </div>
  );
};

export default Modal;
