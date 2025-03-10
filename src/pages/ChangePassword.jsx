import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for showing/hiding password
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap

const ChangePassword = () => {
  const [userEmail, setUserEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [renewPassword, setRenewPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRenewPassword, setShowRenewPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // State to control error modal visibility

  useEffect(() => {
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.email) {
            setUserEmail(data.email);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    if (newPassword !== renewPassword) {
      setError("New passwords do not match!");
      setShowErrorModal(true);
      return;
    }
  
    if (currentPassword === newPassword && renewPassword) {
      setError("Current password cannot be the same as the new password!");
      setShowErrorModal(true);
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
        },
        body: JSON.stringify({
          current_password: currentPassword, // Send current password for validation
          password: newPassword, // New password to update
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to update password");
      }
  
      setSuccessMessage("Password changed successfully!");
  
      // Clear the user's session (logout)
      localStorage.removeItem("token");
      localStorage.removeItem("user-info");
  
      // Redirect the user to the login page
      window.location.href = "/login"; // Adjust the redirect URL as per your routes
  
      // Reset the form fields
      setCurrentPassword("");
      setNewPassword("");
      setRenewPassword("");
    } catch (error) {
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label"
        style={{color:'#a37f67'}}>
          Current Password
        </label>
        <div className="col-md-8 col-lg-9 position-relative">
          <input
            name="password"
            type={showCurrentPassword ? "text" : "password"}
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-4"
            style={{ cursor: 'pointer', color:'#a37f67' }}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label"
        style={{color:'#a37f67'}}>
          New Password
        </label>
        <div className="col-md-8 col-lg-9 position-relative">
          <input
            name="newpassword"
            type={showNewPassword ? "text" : "password"}
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-4"
            style={{ cursor: 'pointer', color:'#a37f67' }}
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label"
        style={{color:'#a37f67'}}>
          Re-enter New Password
        </label>
        <div className="col-md-8 col-lg-9 position-relative">
          <input
            name="renewpassword"
            type={showRenewPassword ? "text" : "password"}
            className="form-control"
            id="renewPassword"
            value={renewPassword}
            onChange={(e) => setRenewPassword(e.target.value)}
          />
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-4"
            style={{ cursor: 'pointer', color:'#a37f67' }}
            onClick={() => setShowRenewPassword(!showRenewPassword)}
          >
            {showRenewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="text-center">
        <button type="submit" className="btn"
        style={{backgroundColor:'#e3d2b9'}}>
          Change Password
        </button>
      </div>

      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton style={{ backgroundColor: '#e3d2b9' }}>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default ChangePassword;