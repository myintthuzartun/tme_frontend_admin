import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/header_page'; // ✅ Correct relative import
import Sider from '../components/sider'; // ✅ Correct relative import
import Footer from '../components/footer'; // ✅ Correct relative import
import { motion } from "motion/react";
import BackToTop from "../components/back_to_top";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [editImage, setEditImage] = useState([]);
  const [images, setImages] = useState([]); // State to store fetched images
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/admin-image", {
          cache: "no-store", // Ensure fresh data, disable cache
        });
        setImages(data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImages();
  }, []);
  

  useEffect(() => {
    // Fetch the data when the component mounts
    axios.get("http://127.0.0.1:8000/api/admin-image")
      .then(response => setEditImage(response.data))
      .catch(error => console.error("Error fetching data", error));
  }, []);

  useEffect(() => {
    // Check for user info in localStorage
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // If the user object contains an ID, fetch the user's email from the API
        if (parsedUser && parsedUser.id) {
          axios.get(`http://127.0.0.1:8000/api/user/${parsedUser.id}`)
            .then(response => {
              // Assuming the API response includes an "email" field
              if (response.data && response.data.email) {
                setUserEmail(response.data.email);
              }
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
        }
      } catch (error) {
        console.error('Error parsing stored user info:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch all admin profiles from the backend
    axios.get('http://127.0.0.1:8000/api/admin-profiles')
      .then(response => {
        if (response.data && response.data.length > 0) {
          const fetchedProfile = response.data[0];
          setProfile(fetchedProfile);
  
          // Fetch profile image if available
          if (fetchedProfile.image_path) {
            setImagePreview(`http://127.0.0.1:8000/${fetchedProfile.image_path}`);
          }
        }
      })
      .catch(error => {
        console.error("Error fetching admin profiles:", error);
      });
  }, []);
  
  if (!profile) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }
  

  return (
    <>
      <Header />
      <Sider />
      <motion.main className="main" id="main"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <div className="row mb-4 align-items-center">
                    <div>
                      {loading ? (
                        <div className="loader-container">
                          <div className="loader"></div>
                          <p>Loading images...</p>
                        </div>
                      ) : images.length > 0 ? (
                        images.map((image) => (
                          <div key={image.id} style={{ textAlign: "center", margin: "10px" }}>
                            <img
                              src={`http://127.0.0.1:8000/${image.image_path}`}
                              alt="Profile"
                              style={{
                                borderRadius: "50%",
                                width: "250px",
                                height: "130px",
                                objectFit: "cover",// Maintain aspect ratio
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <p>No images found.</p> // Fallback if no images are available
                      )}
                    </div>
                  </div>
                  <h5 className='mt-4'>{userEmail}</h5>
                  <h3>{profile.job}</h3>
                  <div className="social-links mt-3">
                    {profile.twitter && (
                      <a href={profile.twitter} className="twitter" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter" />
                      </a>
                    )}
                    {profile.facebook && (
                      <a href={profile.facebook} className="facebook" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook" />
                      </a>
                    )}
                    {profile.instagram && (
                      <a href={profile.instagram} className="instagram" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-instagram" />
                      </a>
                    )}
                    {profile.linkedin && (
                      <a href={profile.linkedin} className="linkedin" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-linkedin" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Bordered Tabs */}
                  <ul className="nav nav-tabs nav-tabs-bordered ">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-change-password"
                      >
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                      <div>
                      <h6 className="mt-3" style={{ fontSize: "1.05rem" }}>Profile Details</h6>

                        {loading ? (
                           <div className="loader-container">
                           <div className="loader"></div>
                         </div>
                        ) : editImage.length > 0 ? (
                          editImage.map((image) => (
                            <div key={image.id} className="image-item">
                              <div className="row">
                                <div className="col-lg-3 col-md-4 label mt-3">Profile Image</div>
                                <div className="col-lg-9 col-md-8">
                                  <img
                                    src={`http://127.0.0.1:8000/${image.image_path}`}
                                    alt="Profile"
                                    style={{
                                      borderRadius: "50%",
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "cover", // Maintain aspect ratio
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No images found.</p> // Fallback if no images are available
                        )}
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">About</div>
                        <div className="col-lg-9 col-md-8">{profile.about || "Not Provided"}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">{userEmail || "Not Provided"}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Company</div>
                        <div className="col-lg-9 col-md-8">{profile.company}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Job</div>
                        <div className="col-lg-9 col-md-8">{profile.job}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Country</div>
                        <div className="col-lg-9 col-md-8">{profile.country}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">{profile.address}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">{profile.phone}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Fabebook</div>
                        <div className="col-lg-9 col-md-8">{profile.facebook || "Not Provided"}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Instagram</div>
                        <div className="col-lg-9 col-md-8">{profile.instagram || "Not Provided"}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Twitter</div>
                        <div className="col-lg-9 col-md-8">{profile.twitter || "Not Provided"}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Linkedin</div>
                        <div className="col-lg-9 col-md-8">{profile.linkedin || "Not Provided"}</div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* Profile Edit Form */}
                      <EditProfile />
                      {/* End Profile Edit Form */}
                    </div>
                    <div className="tab-pane fade pt-3" id="profile-change-password">
                      <ChangePassword />
                    </div>
                  </div>
                  {/* End Bordered Tabs */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </>
  )
}
export default Profile;