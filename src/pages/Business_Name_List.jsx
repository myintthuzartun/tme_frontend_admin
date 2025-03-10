import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";
import Header from "../components/header_page";
import Sider from "../components/sider";
import BackToTop from "../components/back_to_top";
import Footer from "../components/footer"; // Import Footer component
import { useTranslation } from "react-i18next"; // Import useTranslation

const BusinessList = () => {
  const { lang } = useParams(); // Get the language from the URL
  const { t, i18n } = useTranslation(); // Initialize the translation hook
  const [selectedLanguage, setSelectedLanguage] = useState(lang || "en"); // Default to "en" if no language is provided
  const [businessTypes, setBusinessTypes] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [editingBusinessType, setEditingBusinessType] = useState(null);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  const languages = [
    { value: "en", label: "English" },
    { value: "thai", label: "Thailand" },
    { value: "myan", label: "Myanmar" },
  ];


  // Fetch business types for the selected language
  const fetchBusinessTypes = async (lang) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/business_type?lang=${lang}`);
      const data = await response.json();
      if (response.ok) {
        setBusinessTypes(data);
      } else {
        setMessage(t("fetch_error"));
      }
    } catch (error) {
      setMessage(t("server_error"));
    } finally {
      setLoading(false);
    }
  };

  // Handle language change
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
    const langParam = urlParams.get("lang") || "en";
    setSelectedLanguage(langParam);
    i18n.changeLanguage(langParam);
    fetchBusinessTypes(langParam);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setFormLoading(true);

    const formData = {
      [`business_name_${selectedLanguage}`]: businessName,
    };

    if (editingBusinessType) {
      const existingData = await fetch(`http://127.0.0.1:8000/api/business_type/${editingBusinessType.id}`)
        .then((res) => res.json())
        .catch(() => null);

      if (existingData) {
        Object.keys(existingData).forEach((key) => {
          if (!formData[key]) formData[key] = existingData[key];
        });
      }
    }

    try {
      const method = editingBusinessType ? "PUT" : "POST";
      const url = editingBusinessType
        ? `http://127.0.0.1:8000/api/business_type/${editingBusinessType.id}`
        : "http://127.0.0.1:8000/api/business_type";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(editingBusinessType ? t("update_success") : t("add_success"));
        resetForm();
        setShowModal(false);
        setEditingBusinessType(null);
        fetchBusinessTypes(selectedLanguage);
      } else {
        setMessage(`Error: ${data.message || t("add_error")}`);
      }
    } catch (error) {
      setMessage(t("server_error"));
    } finally {
      setFormLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (businessType) => {
    setBusinessName(businessType.business_name || "");
    setEditingBusinessType(businessType);
    setShowModal(true);
  };


  // Handle delete
  const handleDelete = async () => {
    if (!businessToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/business_type/${businessToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage(t("delete_success"));
        fetchBusinessTypes(selectedLanguage);
      } else {
        setMessage(t("delete_error"));
      }
    } catch (error) {
      setMessage(t("server_error"));
    } finally {
      setShowDeleteModal(false);
      setBusinessToDelete(null);
    }
  };

  // Reset form
  const resetForm = () => {
    setBusinessName("");
    setEditingBusinessType(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
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
          <h1>{t("business_types")}</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">{t("home")}</a>
              </li>
              <li className="breadcrumb-item active">{t("business_types")}</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row w-100 justify-content-center">
            <div className="col-lg-12">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                    <h5 className="card-title mb-0 text-uppercase text-dark">{t("business_type_form")}</h5>
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
                        padding: "10px 15px",
                      }}
                    >
                      <i className="fa fa-plus me-2"></i> {t("add_type")}
                    </button>
                  </div>
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
                      className={`alert ${message.includes("Error") ? "alert-danger" : "alert-success"} alert-dismissible fade show`}
                      role="alert"
                    >
                      {message}
                      <button type="button" className="btn-close" onClick={() => setMessage("")}></button>
                    </div>
                  )}

                  {/* Display Business Types */}
                  {loading ? (
                    <p className="text-center">{t("loading")}</p>
                  ) : businessTypes.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-striped table-hover text-center">
                        <thead>
                          <tr>
                            <th className="text-center">{t("no")}</th>
                            <th className="text-center">{t("business_name")}</th>
                            <th className="text-center">{t("action")}</th>
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
                                    style={{ backgroundColor: "#e3d2b9", fontWeight: "bold", borderRadius: "5px", padding: "8px 15px" }}
                                    onClick={() => handleEdit(businessType)}
                                  >
                                    <i className="fa fa-edit me-1"></i> {t("edit")}
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger d-flex align-items-center"
                                    style={{ fontWeight: "bold", borderRadius: "5px", padding: "8px 10px" }}
                                    onClick={() => {
                                      setBusinessToDelete(businessType);
                                      setShowDeleteModal(true);
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
                    <p className="text-center">{t("no_data")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <BackToTop />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header text-white" style={{ backgroundColor: "#e3d2b9" }}>
                <h5 className="modal-title" style={{ color: "#5a4633" }}>
                  {editingBusinessType ? t("edit_business_type") : t("add_business_type")}
                </h5>
                <button type="button" className="btn-close text-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="businessName" className="form-label" style={{ color: "#5a4633" }}>
                      {t("business_name")}
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
                      {formLoading ? t("submitting") : t("submit")}
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
                <h5 className="modal-title" style={{ color: "#5a4633" }}>
                  {t("confirm_delete")}
                </h5>
                <button type="button" className="btn-close text-white" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>{t("delete_confirmation")}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  {t("cancel")}
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  {t("delete")}
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