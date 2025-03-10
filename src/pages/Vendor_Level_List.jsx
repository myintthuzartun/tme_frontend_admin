  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { FaGlobe } from "react-icons/fa";
  import { motion } from "framer-motion";
  import Header from "../components/header_page";
  import Sider from "../components/sider";
  import BackToTop from "../components/back_to_top";
  import { useTranslation } from "react-i18next"; // Import useTranslation

  const VendorLevel = () => {
    const { lang } = useParams(); // Get the language from the URL
    const { t, i18n } = useTranslation(); // Initialize the translation hook
    const [selectedLanguage, setSelectedLanguage] = useState(lang || "en"); // Default to "en" if no language is provided
    const [vendorLevels, setVendorLevels] = useState([]);
    const [vendorLevel, setVendorLevel] = useState("");
    const [levelDescription, setLevelDescription] = useState("");
    const [benefits, setBenefits] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [editingVendorLevel, setEditingVendorLevel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [vendorToDelete, setVendorToDelete] = useState(null);

    const languages = [
      { value: "en", label: "English" },
      { value: "thai", label: "Thailand" },
      { value: "myan", label: "Myanmar" },
    ];

    // Fetch vendor levels for the selected language
    const fetchVendorLevels = async (lang) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/vendor-levels?lang=${lang}`);
        const data = await response.json();
        if (response.ok) {
          setVendorLevels(data); // Update vendor levels
        } else {
          setMessage("Failed to fetch vendor levels");
        }
      } catch (error) {
        setMessage("Error: Unable to connect to the server.");
      } 
    };

    // Fetch data when the selected language changes
    const handleLanguageChange = (lang) => {
      setSelectedLanguage(lang); // Update selected language in the current tab
      i18n.changeLanguage(lang); // Change the language globally using i18n
    
      // Open a new tab with the selected language as a query parameter
      const newTabUrl = `${window.location.pathname}?lang=${lang}`;
      window.open(newTabUrl, '_blank');
      window.location.reload();

    };
    
    // Fetch data when the component mounts and when the selected language changes
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') || 'en';
      setSelectedLanguage(langParam);
      i18n.changeLanguage(langParam);
      fetchVendorLevels(langParam);
    }, []);

    
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
      setFormLoading(true);

      // Prepare form data
      const formData = {
        [`level_${selectedLanguage}`]: vendorLevel,
        [`level_description_${selectedLanguage}`]: levelDescription,
        [`benefits_${selectedLanguage}`]: benefits,
      };

      // If editing, merge with existing data
      if (editingVendorLevel) {
        const existingData = await fetch(`http://127.0.0.1:8000/api/vendor-levels/${editingVendorLevel.id}`)
          .then((res) => res.json())
          .catch(() => null);

        if (existingData) {
          Object.keys(existingData).forEach((key) => {
            if (!formData[key]) formData[key] = existingData[key];
          });
        }
      }

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
          fetchVendorLevels(selectedLanguage); // Refresh the list for the selected language
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
      setVendorLevel(vendor.level || "");
      setLevelDescription(vendor.level_description || "");
      setBenefits(vendor.benefits || "");
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
          fetchVendorLevels(selectedLanguage); // Refresh the list for the selected language
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
        <motion.main
          id="main"
          className="main"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="pagetitle">
            <h1>Vendor Levels</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">{t("breadcrumb_home")}</a>
                </li>
                <li className="breadcrumb-item active">{t("breadcrumb_vendor_levels")}</li>
              </ol>
            </nav>
          </div>

          <section className="section">
            <div className="row w-100 justify-content-center">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                      <h5 className="card-title text-start">{t("all_vendor_levels")}</h5>
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
                          padding: "10px 15px",
                        }}
                      >
                        <i className="fa fa-plus me-2"></i> {t("add_level")}
                      </button>
                    </div>

                    {/* Language Selection */}
                    <div className="language-selection mb-3">
                      <div className="language-options d-flex align-items-center gap-2">
                        <i>
                          <FaGlobe />
                        </i>
                        <h6 className="mt-2" style={{ fontWeight: "bold" }}>{t("choose_language")}</h6>
                        {languages.map((language) => (
                          <button
                            key={language.value}
                            className={`language-btn btn btn-sm ${
                              selectedLanguage === language.value ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => handleLanguageChange(language.value)}
                            style={{
                              backgroundColor: selectedLanguage === language.value ? "#e3d2b9" : "transparent",
                              borderColor: selectedLanguage === language.value ? "#e3d2b9" : "#007bff",
                              color: selectedLanguage === language.value ? "#000" : "#007bff",
                            }}
                          >
                            {language.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Success/Error Alert */}
                    {message && (
                      <div
                        className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"
                          } alert-dismissible fade show`}
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
                                <th>{t("no")}</th>
                                <th>{t("vendor_level")}</th>
                                <th>{t("description")}</th>
                                <th>{t("benefits")}</th>
                                <th>{t("action")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vendorLevels.map((level, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{level.level}</td>
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
                                        <i className="fa fa-edit me-1"></i> {t("edit")}
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
                                        <i className="fa fa-trash me-1"></i> {t("delete")}
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
        <BackToTop />

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
         {t('vendor_level')} <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="vendorLevel"
                            placeholder={t("vendor_level")}
                            value={vendorLevel}
                            onChange={(e) => setVendorLevel(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="levelDescription" className="col-sm-3 col-form-label">
                          {t("description")} <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            className="form-control"
                            id="levelDescription"
                            rows="3"
                            placeholder={t("description")}
                            value={levelDescription}
                            onChange={(e) => setLevelDescription(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="benefits" className="col-sm-3 col-form-label">
                          {t('benefits')} <span className="text-danger">*</span>
                        </label>
                        <div className="col-sm-9">
                          <textarea
                            className="form-control"
                            id="benefits"
                            rows="3"
                            placeholder={t("benefits")}
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