import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Apply = () => {
  const [image, setImage] = useState(null);  // For image preview, not saved as JSON directly
  const [imageBase64, setImageBase64] = useState('');  // To store base64 encoded image
  const [options, setOptions] = useState([]);  // Populate these options from your API
  const [formData, setFormData] = useState({
    brandLogo: '',   // Brand logo will be handled differently, see note below
    businessName: '',
    businessType: '',
    brn: '',
    tin: '',
    country: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });

  // Fetch the business types from the API (you can adjust this based on your backend)
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/business-types');
        setOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch business types:', error);
      }
    };
    fetchBusinessTypes();
  }, []);

  // Handle image upload and convert to base64
  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));  // Set image preview

    // Convert image file to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);  // Set base64 encoded image
      setFormData({ ...formData, brandLogo: reader.result });  // Store base64 image data in formData
    };
    if (file) {
      reader.readAsDataURL(file);  // Read the file as base64
    }
  };

  const handleRemove = () => {
    setImage(null);
    setImageBase64('');  // Clear base64 data
    setFormData({ ...formData, brandLogo: '' });
  };

  // Handle changes for other form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data as JSON to the backend API
      const response = await axios.post('http://localhost:5000/api/vendor', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Vendor information saved successfully!');
    } catch (error) {
      alert('Failed to save vendor information!');
      console.error(error);
    }
  };

  return (
    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="tab-pane fade show active profile-overview" id="profile-overview">
        <h5 className="card-title">Vendor Business Information</h5>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label" htmlFor="profileImage">Brand Logo</label>
          <div className="col-md-8 col-lg-9">
            <img alt="Logo" src={image || "assets/img/profile-img.jpg"} style={{ width: '20%' }} />
            <div className="pt-2">
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
              <a className="btn btn-primary btn-sm" href="#" onClick={() => document.getElementById('file-upload').click()}>
                <i className="bi bi-upload" />
              </a>
              <a className="btn btn-danger btn-sm" href="#" onClick={handleRemove}>
                <i className="bi bi-trash" />
              </a>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label" htmlFor="businessName">Business Name</label>
          <div className="col-md-8 col-lg-9">
            <input
              className="form-control"
              value={formData.businessName}
              onChange={handleChange}
              id="businessName"
              name="businessName"
              type="text"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-md-4 col-lg-3 col-form-label" htmlFor="businessType">Business Type</label>
          <div className="col-md-8 col-lg-9">
            <select
              id="businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
            >
              <option value="">-- Select --</option>
              {options.length > 0 ? options.map((item) => (
                <option key={item.type_id} value={item.type_id}>
                  {item.business_name}
                </option>
              )) : <option disabled>Loading...</option>}
            </select>
          </div>
        </div>
        {/* Add other fields here */}
        <div className="text-center">
          <button className="btn btn-primary" type="submit">Save Info</button>
        </div>
      </div>
    </form>
  );
};

export default Apply;
