import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const ProfileManagement = () => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [updatingImageId, setUpdatingImageId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin-image");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin-profiles/1');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const showModal = localStorage.getItem('showProfileModal');
    if (showModal === 'true') {
      setShowProfileModal(true);
      localStorage.removeItem('showProfileModal');
    }
  }, []);

  const handleImageChange = (e, imageId = null) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      setImages([]);
      setImage(selectedFile);
      setUpdatingImageId(imageId);
      setImagePreview(null);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsImageSelected(true);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setImagePreview(null);
    setIsImageSelected(false);
    setUpdatingImageId(null);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profileResponse = await axios.put(
        `http://127.0.0.1:8000/api/admin-profiles/1`,
        profile
      );
      console.log('Profile updated successfully!', profileResponse.data);

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        if (updatingImageId) {
          const imageResponse = await axios.post(
            `http://127.0.0.1:8000/api/admin-image/${updatingImageId}/update`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log('Image updated successfully!', imageResponse.data);

          setImages((prevImages) =>
            prevImages.map((img) =>
              img.id === updatingImageId ? imageResponse.data.image : img
            )
          );
        } else {
          const imageResponse = await axios.post(
            "http://127.0.0.1:8000/api/admin-image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log('Image uploaded successfully!', imageResponse.data);

          setImages((prevImages) => [...prevImages, imageResponse.data.image]);
        }
      }

      localStorage.setItem('showProfileModal', 'true');
      window.location.reload();

      setImage(null);
      setImagePreview(null);
      setIsImageSelected(false);
      setUpdatingImageId(null);

    } catch (error) {
      console.error("Error updating profile or uploading/updating image", error);
    }
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin-image/${imageId}`);
      setImages(images.filter(img => img.id !== imageId));
      console.log('Image deleted successfully!');
      setShowDeleteModal(true); // Show the delete modal
    } catch (error) {
      console.error('Error deleting image', error);
    }
  };

  return (
    <div className="" style={{ fontSize: "0.95rem" }}>
      <h5 className="mt-1" style={{ fontSize: "1.1rem" }}>Profile Details</h5>

      <div className="row mt-4">
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Profile Image</label>
        </div>
        <div className="col-md-8 col-lg-9">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} style={{ display: "inline-block", marginBottom: '10px', textAlign: 'center' }}>
                <img
                  src={`http://127.0.0.1:8000/${image.image_path}`}
                  alt="Profile"
                  style={{
                    borderRadius: "10%",
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    marginBottom: '10px',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, image.id)}
                    style={{ display: "none" }}
                    id={`fileInput-${image.id}`}
                  />
                  <label htmlFor={`fileInput-${image.id}`} style={{ cursor: "pointer" }}>
                    <i className="bi bi-upload" style={{ color: "#a37f67", fontSize: "24px" }} />
                  </label>
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <i className="bi bi-trash" style={{ color: "#dc3545", fontSize: "24px" }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
              <input
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              {!isImageSelected && (
                <button
                  className="btn btn-sm mb-4"
                  style={{ backgroundColor: "#e3d2b9", width: "150px", marginBottom: "500px" }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Choose Image <i className="bi bi-upload" />
                </button>
              )}
              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      borderRadius: "10%",
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="mt-1 mb-4">
                    <button
                      onClick={handleCancel}
                      className="btn btn-secondary btn-sm d-flex align-items-center"
                      style={{ minWidth: "80px", height: "35px" }}
                    >
                      Cancel <i className="bi bi-x ms-1" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

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
          <button type="submit" className="btn" style={{ backgroundColor: '#e3d2b9' }}>
            Save Changes
          </button>
        </div>
      </form>

      <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
        <Modal.Header closeButton style={{ backgroundColor: '#e3d2b9' }}>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your profile has been updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfileModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => { setShowDeleteModal(false); window.location.reload(); }}>
        <Modal.Header closeButton style={{ backgroundColor: '#e3d2b9' }}>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>The image has been deleted successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowDeleteModal(false); window.location.reload(); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileManagement;