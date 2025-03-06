import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from '../API'; // Ensure your API is correctly imported
export const Apply1 = () => {
     const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("vendor/assets/img/profile-img.jpg"); // Default profile image
    const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const location = useLocation();
  const [emailtest, setEmailTest] = useState('');
  const { email } = location.state || {};  // Destructure email from location state
  

  useEffect(() => {
    // Ensure email exists in location state
    if (email) {
      sessionStorage.setItem('emailtoken', email); // Store email in sessionStorage
    }

    // Retrieve the stored email from sessionStorage
    const storedEmail = sessionStorage.getItem('emailtoken');
    if (storedEmail) {
      setEmailTest(storedEmail); // Set emailtest state
    }
  }, [email]);  // Run this effect only when 'email' changes


  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        // Use POST request instead of GET
        const response = await api.post("/business", {
          // If you need to send data, include it here (example: { someKey: 'value' })
        });
        
        // Make sure the response contains 'business_types' key
        setOptions(response.data.business_types);  // Access business_types from the response
      } catch (error) {
        console.error("Failed to fetch business types:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBusinessTypes();
  }, []);  // Empty dependency array ensures it only runs once on mount
  //textarea
  const handleChange = (event) => {
    setText(event.target.value);
  };
    // Handle file selection
    const handleUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
  
        // Create URL for preview
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
  
        console.log("Uploaded file:", file.name);
      }
    };
  
    // Handle file deletion
    const handleDelete = () => {
      setSelectedFile(null);
      setPreviewUrl("vendor/assets/img/profile-img.jpg"); // Reset to default image
      console.log("Profile image removed.");
    };
  
    // Function to trigger file input click
    const triggerFileInput = (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      document.getElementById("fileInput").click();
    };
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
       //   sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('emailtoken');
          navigate("/");
        }
      };
  return (
    <div className="d-flex justify-content-center" style={{ marginTop: "60px" }}>
        <div className="col-xl-5">
  <div className="card">
  <h5 className="card-title text-center">Vendor Business Information</h5>
    <div className="card-body pt-3">
      {/* Bordered Tabs */}
      <ul className="nav nav-tabs nav-tabs-bordered">
        <li className="nav-item" style={{ marginRight: '50px' }}>
          <button
            className="nav-link active"
            data-bs-toggle="tab"
            data-bs-target="#profile-overview"
            title="Vendor Business Information"
          >
           <i className="fa-solid fa-briefcase"></i>
          </button>
        </li>
        <li className="nav-item" style={{ marginRight: '50px' }}>
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#profile-edit"
            title="Vendor Owner/Representative Information"
          >
           <i className="fa-solid fa-circle-info"></i>
          </button>
        </li>
        <li className="nav-item" style={{ marginRight: '50px' }}>
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#profile-settings"
             title="Product & Category Information"
          >
           <i className="fa-solid fa-list"></i>
          </button>
        </li>
        <li className="nav-item" style={{ marginRight: '50px' }}>
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#profile-change-password"
            title="Fulfillment & Logistics"
          >
            <i className="fa-solid fa-truck-fast"></i>
          </button>
        </li>
        <li className="nav-item" style={{ marginRight: '50px' }}>
          <button
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#profile-change-password"
            title="Payment Info & Legal Documents"
          >
           <i className="fa-solid fa-file-contract"></i>
          </button>
        </li>
         {/* New Sign-In Tab */}
         <li className="nav-item ms-auto" style={{ marginRight: '20px' }}>
    <button
      className="nav-link"
      
    >
      <i className="fa-solid fa-user ms-3"></i>   {emailtest}
    </button>
  </li>
  <li className="nav-item ms-auto" style={{ marginRight: '50px' }}>
  <button
      className="nav-link"
       
      onClick={handleLogout}
    >
      <i className="fa-solid fa-sign-out-alt"></i> Logout
    </button>
  </li>
      </ul>
      <div className="tab-content pt-2">
        <div
          className="tab-pane fade show active profile-overview"
          id="profile-overview"
        >
          <h5 className="card-title">Business Info</h5>
          <div className="row mb-3">
          <div className="col-lg-5 col-md-4 label">
              <label
                htmlFor="profileImage"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Brand Logo
              </label>
              </div>
              <div className="col-md-8 col-lg-7">
      {/* Profile Image */}
      <img src={previewUrl} alt="Profile" style={{ width: "20%"}} />

      <div className="pt-2 d-flex gap-2">
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />

        {/* Upload Button (Using <a> tag) */}
        <a
          href="#"
          className="btn btn-primary btn-sm"
          title="Upload new profile image"
          onClick={triggerFileInput}
        >
          <i className="bi bi-upload" /> Upload
        </a>

        {/* Delete Button */}
        <button
          className="btn btn-danger btn-sm"
          title="Remove my profile image"
          onClick={handleDelete}
          disabled={!selectedFile} // Disable if no file is selected
        >
          <i className="bi bi-trash" /> Delete
        </button>
      </div>
    </div>
              
            </div>
          
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label ">Business Name</div>
            <div className="col-lg-7 col-md-8">
            <input
                  name="businessname"
                  type="text"
                  className="form-control"
                  id="businessname"
                  defaultValue="The Business Name"
                />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Business Type</div>
            <div className="col-lg-7 col-md-8">
            <select id="dropdown" className="form-select">
        <option value="">-- Select Business Type --</option>
        {loading ? (
          <option disabled>Loading...</option>
        ) : (
          options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.business_name}
            </option>
          ))
        )}
      </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Business Registration Number</div>
            <div className="col-lg-7 col-md-8">
            <input
                  className="form-control"
                  defaultValue="BRN-123456"
                  id="BRN"
                  name="BRN"
                  type="text"
                />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Tax Identification Number</div>
            <div className="col-md-8 col-lg-7">
                <input
                  className="form-control"
                  defaultValue="1234567890123"
                  id="tin"
                  name="tin"
                  type="text"
                />
              </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Country</div>
            <div className="col-md-8 col-lg-7">
                <input
                  className="form-control"
                  defaultValue="Thailand"
                  id="Country"
                  name="country"
                  type="text"
                />
              </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Address</div>
            <div className="col-lg-7 col-md-8">
            <textarea
        className="form-control"
        id="exampleTextarea"
        rows="4" // Specifies the number of rows (height of the textarea)
        value={text} // Controlled component: value is from state
        onChange={handleChange} // Update the state when text is changed
        placeholder="Write company's address here..."
      ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Phone</div>
            <div className="col-lg-7 col-md-8">  <input
                  className="form-control"
                  defaultValue="02-745-7353"
                  id="Phone"
                  name="phone"
                  type="text"
                /></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Official Email</div>
            <div className="col-lg-7 col-md-8">   <input
                  className="form-control"
                  defaultValue="buinessowner@example.com"
                  id="Email"
                  name="email"
                  type="email"
                /></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Website</div>
            <div className="col-lg-7 col-md-8">   <input
                  className="form-control"
                  defaultValue="http://"
                  id="website"
                  name="website"
                  type="text"
                /></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Twitter Profile</div>
            <div className="col-lg-7 col-md-8">   <input
                  className="form-control"
                  defaultValue="https://twitter.com/#"
                  id="Twitter"
                  name="twitter"
                  type="text"
                /></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Facebook Profile</div>
            <div className="col-lg-7 col-md-8">   <input
                  className="form-control"
                  defaultValue="https://facebook.com/#"
                  id="Facebook"
                  name="facebook"
                  type="text"
                /></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Instagram Profile</div>
            <div className="col-lg-7 col-md-8">    <input
                  className="form-control"
                  defaultValue="https://instagram.com/#"
                  id="Instagram"
                  name="instagram"
                  type="text"
                /></div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-5 col-md-4 label">Linkedin Profile</div>
            <div className="col-lg-7 col-md-8">   <input
                  className="form-control"
                  defaultValue="https://linkedin.com/#"
                  id="Linkedin"
                  name="linkedin"
                  type="text"
                /></div>
          </div>
          <div className="text-center">
              <button className="btn btn-primary" type="submit">
                Save Info
              </button>
            </div>
        </div>
        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
          {/* Profile Edit Form */}
          <form>
            <div className="row mb-3">
              <label
                htmlFor="profileImage"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Profile Image
              </label>
              <div className="col-md-8 col-lg-9">
                <img src="assets/img/profile-img.jpg" alt="Profile" />
                <div className="pt-2">
                  <a
                    href="#"
                    className="btn btn-primary btn-sm"
                    title="Upload new profile image"
                  >
                    <i className="bi bi-upload" />
                  </a>
                  <a
                    href="#"
                    className="btn btn-danger btn-sm"
                    title="Remove my profile image"
                  >
                    <i className="bi bi-trash" />
                  </a>
                </div>
              </div>
              
            </div>
            <div className="row mb-3">
              <label
                htmlFor="fullName"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Full Name
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="fullName"
                  type="text"
                  className="form-control"
                  id="fullName"
                  defaultValue="Kevin Anderson"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="about"
                className="col-md-4 col-lg-3 col-form-label"
              >
                About
              </label>
              <div className="col-md-8 col-lg-9">
                <textarea
                  name="about"
                  className="form-control"
                  id="about"
                  style={{ height: 100 }}
                  defaultValue={
                    "Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde."
                  }
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="company"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Company
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="company"
                  type="text"
                  className="form-control"
                  id="company"
                  defaultValue="Lueilwitz, Wisoky and Leuschke"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">
                Job
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="job"
                  type="text"
                  className="form-control"
                  id="Job"
                  defaultValue="Web Designer"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Country"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Country
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="country"
                  type="text"
                  className="form-control"
                  id="Country"
                  defaultValue="USA"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Address"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Address
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  id="Address"
                  defaultValue="A108 Adam Street, New York, NY 535022"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Phone"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Phone
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="phone"
                  type="text"
                  className="form-control"
                  id="Phone"
                  defaultValue="(436) 486-3538 x29071"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Email"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Email
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="Email"
                  defaultValue="k.anderson@example.com"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Twitter"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Twitter Profile
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="twitter"
                  type="text"
                  className="form-control"
                  id="Twitter"
                  defaultValue="https://twitter.com/#"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Facebook"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Facebook Profile
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="facebook"
                  type="text"
                  className="form-control"
                  id="Facebook"
                  defaultValue="https://facebook.com/#"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Instagram"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Instagram Profile
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="instagram"
                  type="text"
                  className="form-control"
                  id="Instagram"
                  defaultValue="https://instagram.com/#"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="Linkedin"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Linkedin Profile
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="linkedin"
                  type="text"
                  className="form-control"
                  id="Linkedin"
                  defaultValue="https://linkedin.com/#"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
          {/* End Profile Edit Form */}
        </div>
        <div className="tab-pane fade pt-3" id="profile-settings">
          {/* Settings Form */}
          <form>
            <div className="row mb-3">
              <label
                htmlFor="fullName"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Email Notifications
              </label>
              <div className="col-md-8 col-lg-9">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="changesMade"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="changesMade">
                    Changes made to your account
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="newProducts"
                    defaultChecked=""
                  />
                  <label className="form-check-label" htmlFor="newProducts">
                    Information on new products and services
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="proOffers"
                  />
                  <label className="form-check-label" htmlFor="proOffers">
                    Marketing and promo offers
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="securityNotify"
                    defaultChecked=""
                    disabled=""
                  />
                  <label className="form-check-label" htmlFor="securityNotify">
                    Security alerts
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
          {/* End settings Form */}
        </div>
        <div className="tab-pane fade pt-3" id="profile-change-password">
          {/* Change Password Form */}
          <form>
            <div className="row mb-3">
              <label
                htmlFor="currentPassword"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Current Password
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="currentPassword"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="newPassword"
                className="col-md-4 col-lg-3 col-form-label"
              >
                New Password
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="newpassword"
                  type="password"
                  className="form-control"
                  id="newPassword"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="renewPassword"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Re-enter New Password
              </label>
              <div className="col-md-8 col-lg-9">
                <input
                  name="renewpassword"
                  type="password"
                  className="form-control"
                  id="renewPassword"
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </div>
          </form>
          {/* End Change Password Form */}
        </div>
      </div>
      {/* End Bordered Tabs */}
    </div>
  </div>
</div>

    </div>
  )
}
export default Apply1;