import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmationModal({ 
  show, 
  handleClose, 
  handleConfirm, 
  title, 
  message, 
  type // 'add', 'update', 'delete', 'error' 
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirm Action"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "Are you sure you want to proceed?"}</Modal.Body>
      <Modal.Footer>
        {type === "delete" ? (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Confirm
            </Button>
          </>
        ) : (
          <Button variant={type === "error" ? "danger" : "primary"} onClick={handleConfirm}>
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
