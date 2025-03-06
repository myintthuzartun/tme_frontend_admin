import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export const EditProfile = () => {
  const [profile, setProfile] = useState({
    about: '',
    company: '',
    job: '',
    country: '',
    address: '',
    phone: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  });

  const [showModal, setShowModal] = useState(false); // State for managing modal visibility

  useEffect(() => {
    // Fetch profile data from API
    axios.get('http://127.0.0.1:8000/api/admin-profiles/1')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile data', error);
      });

    // Check if the modal state exists in sessionStorage and show the modal if true
    if (sessionStorage.getItem('showModal') === 'true') {
      setShowModal(true);
      sessionStorage.removeItem('showModal'); // Clear sessionStorage after showing the modal
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating profile with data:', profile);  // Log the data for debugging
    
    // Update profile using API
    axios.put(`http://127.0.0.1:8000/api/admin-profiles/1`, profile)
      .then(response => {
        console.log('Profile updated successfully!', response.data);
        
        // Set sessionStorage to show the modal after page reload
        sessionStorage.setItem('showModal', 'true');
    
        // Refresh the page after a successful update
        setTimeout(() => {
          window.location.reload();  // Reload the page
        }, 1000);  // Wait for the modal to show before reloading
      })
      .catch(error => {
        console.error('Error updating profile', error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="about"
                className="form-control"
                id="about"
                style={{ height: 100 }}
                value={profile.about}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Company</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="company"
                type="text"
                className="form-control"
                id="company"
                value={profile.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="job" className="col-md-4 col-lg-3 col-form-label">Job</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="job"
                type="text"
                className="form-control"
                id="job"
                value={profile.job}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="country" className="col-md-4 col-lg-3 col-form-label">Country</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="country"
                type="text"
                className="form-control"
                id="country"
                value={profile.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">Address</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="address"
                type="text"
                className="form-control"
                id="address"
                value={profile.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="phone"
                type="text"
                className="form-control"
                id="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="twitter"
                type="text"
                className="form-control"
                id="twitter"
                value={profile.twitter}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="facebook"
                type="text"
                className="form-control"
                id="facebook"
                value={profile.facebook}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="instagram"
                type="text"
                className="form-control"
                id="instagram"
                value={profile.instagram}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="linkedin"
                type="text"
                className="form-control"
                id="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn "
            style={{backgroundColor: '#e3d2b9'}}>
              Save Changes
            </button>
          </div>
        </form>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton  style={{ backgroundColor: '#e3d2b9' }}>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your profile has been updated successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  export default EditProfile;
