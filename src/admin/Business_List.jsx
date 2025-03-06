import React, { useState, useEffect } from "react";
import Header from './nav/Header_Page.jsx'; // ✅ Correct relative import
import Sider from './nav/Sider.jsx'; // ✅ Correct relative import
import Footer from './nav/Footer.jsx'; // ✅ Correct relative import
import { motion } from "motion/react";


const BusinessList = () => {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [editingBusinessType, setEditingBusinessType] = useState(null);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  useEffect(() => {
    fetchBusinessTypes();
  }, []);

  // Fetch Business Types
  const fetchBusinessTypes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/business");
      const data = await response.json();
      if (response.ok) {
        setBusinessTypes(data);
      } else {
        setMessage("Error: Unable to fetch business types.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = {
      business_name: businessName,
    };

    try {
      const method = editingBusinessType ? "PUT" : "POST";
      const url = editingBusinessType
        ? `http://127.0.0.1:8000/api/business/${editingBusinessType.id}`
        : "http://127.0.0.1:8000/api/business";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(editingBusinessType ? "Business type updated successfully!" : "Business type added successfully!");
        setShowModal(false);
        setBusinessName("");
        setEditingBusinessType(null);
        fetchBusinessTypes(); // Refresh list
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      setMessage("Error: Unable to submit data.");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (businessType) => {
    setBusinessName(businessType.business_name);
    setEditingBusinessType(businessType);
    setShowModal(true);
  };

  // Handle Delete Confirmation
  const handleDelete = async () => {
    if (!businessToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/business/${businessToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Business type deleted successfully!");
        fetchBusinessTypes(); // Refresh list
      } else {
        setMessage("Error: Unable to delete business type.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setShowDeleteModal(false);
      setBusinessToDelete(null);
    }
  };

  // Reset Form
  const resetForm = () => {
    setBusinessName("");
    setEditingBusinessType(null);
  };

  // Close Modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <>
      <Header />
      <Sider />
     <motion.main id="main" className="main" 
            initial={{ opacity: 0, y:40 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration: 0.5 }}
            >
        <div className="pagetitle">
          <h1>Business Types</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
              <li className="breadcrumb-item active">Business Types</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row w-100 justify-content-center">
            <div className="col-lg-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                    <h5 className="card-title mb-0 text-uppercase text-dark">Business Type Form</h5>
                    <button
                      className="btn d-flex align-items-center shadow-sm"
                      onClick={() => {
                        resetForm();
                        setShowModal(true);
                      }}
                      style={{
                        backgroundColor: "#e3d2b9",
                        borderColor: "#c2a98d",
                        color: "#2e2e2e",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        padding: "10px 15px"
                      }}
                    >
                      <i className="fa fa-plus me-2"></i> Add Type
                    </button>
                  </div>

                  {/* Success/Error Alert */}
                  {message && (
                    <div
                      className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"} alert-dismissible fade show`}
                      role="alert"
                    >
                      {message}
                      <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                    </div>
                  )}

                  {/* Display Business Types */}
                  {loading ? (
                    <p className="text-center">Loading...</p>
                  ) : businessTypes.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-striped table-hover text-center">
                        <thead>
                          <tr>
                            <th className="text-center">No</th>
                            <th className="text-center">Business Name</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {businessTypes.map((businessType, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{businessType.business_name}</td>
                              <td className="align-middle">
                                <div className="d-flex justify-content-center gap-2 flex-nowrap">
                                  <button
                                    className="btn btn-sm d-flex align-items-center text-dark"
                                    style={{ backgroundColor: '#e3d2b9', fontWeight: "bold", borderRadius: "5px", padding: "8px 15px" }}
                                    onClick={() => handleEdit(businessType)}
                                  >
                                    <i className="fa fa-edit me-1"></i> Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger d-flex align-items-center"
                                    style={{ fontWeight: "bold", borderRadius: "5px", padding: "8px 10px" }}
                                    onClick={() => {
                                      setBusinessToDelete(businessType);
                                      setShowDeleteModal(true);
                                    }}
                                  >
                                    <i className="fa fa-trash me-1"></i> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center">No Business Names found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header text-white" style={{ backgroundColor: "#e3d2b9" }}>
                <h5 className="modal-title" style={{ color: "#5a4633" }}>
                  {editingBusinessType ? "Edit Business Type" : "Add Business Type"}
                </h5>
                <button type="button" className="btn-close text-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="businessName" className="form-label" style={{ color: "#5a4633" }}>
                      Business Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn px-4" style={{ backgroundColor: "#e3d2b9", color: "#5a4633" }} disabled={formLoading}>
                      {formLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header text-white" style={{ backgroundColor: "#e3d2b9" }}>
                <h5 className="modal-title" style={{ color: "#5a4633" }}>Confirm Deletion</h5>
                <button type="button" className="btn-close text-white" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this business type?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}
      {showDeleteModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default BusinessList;