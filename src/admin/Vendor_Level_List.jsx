import React, { useState, useEffect } from "react";
import Header from './nav/Header_Page.jsx'; // ✅ Correct relative import
import Sider from './nav/Sider.jsx'; // ✅ Correct relative import
import Footer from './nav/Footer.jsx';
import { motion } from "motion/react";

const VendorLevel = () => {
  const [vendorLevel, setVendorLevel] = useState("");
  const [levelDescription, setLevelDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [vendorLevels, setVendorLevels] = useState([]);
  const [editingVendorLevel, setEditingVendorLevel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  useEffect(() => {
    // Fetch vendor levels on mount
    fetchVendorLevels();
  }, []);

  // Fetch all vendor levels
  const fetchVendorLevels = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/vendor-levels");
      const data = await response.json();
      if (response.ok) {
        setVendorLevels(data);
      } else {
        setMessage("Failed to fetch vendor levels");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setFormLoading(true);

    const formData = {
      vendor_level: vendorLevel,
      level_description: levelDescription,
      benefits: benefits,
    };

    try {
      const method = editingVendorLevel ? "PUT" : "POST";
      const url = editingVendorLevel
        ? `http://127.0.0.1:8000/api/vendor-levels/${editingVendorLevel.id}`
        : "http://127.0.0.1:8000/api/vendor-levels";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(editingVendorLevel ? "Vendor Level updated successfully!" : "Vendor Level added successfully!");
        resetForm();
        setShowModal(false);
        setEditingVendorLevel(null);
        fetchVendorLevels();
      } else {
        setMessage(`Error: ${data.message || "Failed to add vendor level"}`);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setFormLoading(false);
    }
  };

  // Function to edit a vendor level
  const handleEdit = (vendor) => {
    setVendorLevel(vendor.vendor_level);
    setLevelDescription(vendor.level_description);
    setBenefits(vendor.benefits);
    setEditingVendorLevel(vendor); // Set the vendor level to edit
    setShowModal(true); // Open the modal
  };

  // Function to reset form fields
  const resetForm = () => {
    setVendorLevel("");
    setLevelDescription("");
    setBenefits("");
  };

  // Function to close the modal and reset form fields
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVendorLevel(null);
    resetForm();
  };

  // Function to handle deletion
  const handleDelete = async () => {
    if (!vendorToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/vendor-levels/${vendorToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Vendor Level deleted successfully!");
        fetchVendorLevels(); // Refresh the list
      } else {
        setMessage("Failed to delete vendor level.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setShowDeleteModal(false);
      setVendorToDelete(null);
    }
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
          <h1>Vendor Levels</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Vendor Levels</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row w-100 justify-content-center">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                    <h5 className="card-title text-start">All Vendor Levels</h5>
                    <button
                      className="btn d-flex align-items-center shadow-sm"
                      onClick={() => {
                        resetForm(); // Reset form fields
                        setEditingVendorLevel(null); // Clear editing state
                        setShowModal(true); // Open the modal
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
                      <i className="fa fa-plus me-2"></i> Add Level
                    </button>
                  </div>

                  {/* Success/Error Alert */}
                  {message && (
                    <div
                      className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"} alert-dismissible fade show`}
                      role="alert"
                    >
                      {message}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMessage("")}
                      ></button>
                    </div>
                  )}

                  {/* Display Vendor Levels */}
                  <div>
                    {vendorLevels.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Vendor Level</th>
                              <th>Description</th>
                              <th>Benefits</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {vendorLevels.map((level, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{level.vendor_level}</td>
                                <td>{level.level_description}</td>
                                <td>{level.benefits}</td>
                                <td className="align-middle">
                                  <div className="d-flex justify-content-center gap-2 flex-nowrap">
                                    <button
                                      className="btn btn-sm d-flex align-items-center text-dark"
                                      onClick={() => handleEdit(level)}
                                      style={{
                                        backgroundColor: "#e3d2b9",
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                        padding: "8px 15px",
                                      }}
                                    >
                                      <i className="fa fa-edit me-1"></i> Edit
                                    </button>
                                    <button
                                      className="btn btn-sm btn-danger d-flex align-items-center"
                                      style={{
                                        fontWeight: "bold",
                                        borderRadius: "5px",
                                        padding: "8px 10px",
                                      }}
                                      onClick={() => {
                                        setVendorToDelete(level); // Set the vendor level to delete
                                        setShowDeleteModal(true); // Open the delete confirmation modal
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
                      <p>No vendor levels found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />

      {/* Add/Edit Modal */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header text-white" style={{ backgroundColor: "#e3d2b9" }}>
                  <h5 className="modal-title" style={{ color: "#5a4633" }}>
                    {editingVendorLevel ? "Edit Vendor Level" : "Add Vendor Level"}
                  </h5>
                  <button type="button" className="btn-close text-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="vendorLevel" className="col-sm-3 col-form-label">
                        Vendor Level <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          id="vendorLevel"
                          placeholder="Enter Vendor Level"
                          value={vendorLevel}
                          onChange={(e) => setVendorLevel(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="levelDescription" className="col-sm-3 col-form-label">
                        Level Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control"
                          id="levelDescription"
                          rows="3"
                          placeholder="Enter Level Description"
                          value={levelDescription}
                          onChange={(e) => setLevelDescription(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label htmlFor="benefits" className="col-sm-3 col-form-label">
                        Benefits <span className="text-danger">*</span>
                      </label>
                      <div className="col-sm-9">
                        <textarea
                          className="form-control"
                          id="benefits"
                          rows="3"
                          placeholder="Enter Benefits for This Level"
                          value={benefits}
                          onChange={(e) => setBenefits(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn me-2 text-dark"
                        style={{ backgroundColor: "#e3d2b9" }}
                        disabled={formLoading}
                      >
                        {formLoading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header text-white" style={{ backgroundColor: "#e3d2b9" }}>
                  <h5 className="modal-title" style={{ color: "#5a4633" }}>
                    Confirm Deletion
                  </h5>
                  <button type="button" className="btn-close text-white" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this vendor level?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default VendorLevel;