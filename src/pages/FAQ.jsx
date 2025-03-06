import React, { useState, useEffect } from "react";
import Header from "../components/header_page";
import Sider from "../components/sider";
import BackToTop from "../components/back_to_top";
import { motion } from "motion/react";
import LanguageSelector from "../components/language_selector";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingFaq, setEditingFaq] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/faq");
      const data = await response.json();
      if (response.ok) {
        setFaqs(data);
      } else {
        setMessage("Failed to fetch FAQs");
        setShowAlertModal(true);
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
      setShowAlertModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setFormLoading(true);

    const formData = { question, answer };
    const method = editingFaq ? "PUT" : "POST";
    const url = editingFaq
      ? `http://127.0.0.1:8000/api/faq/${editingFaq.id}`
      : "http://127.0.0.1:8000/api/faq";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingFaq ? "FAQ updated successfully!" : "FAQ added successfully!");
        fetchFaqs();
        resetForm();
        setShowModal(false);
      } else {
        setMessage("Failed to process request.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setFormLoading(false);
      setShowAlertModal(true);
    }
  };

  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditingFaq(faq);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!faqToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/faq/${faqToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("FAQ deleted successfully!");
        fetchFaqs();
      } else {
        setMessage("Failed to delete FAQ.");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to the server.");
    } finally {
      setShowDeleteModal(false);
      setFaqToDelete(null);
      setShowAlertModal(true);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
    setEditingFaq(null);
  };

  const closeAlert = () => {
    setShowAlertModal(false);
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
          <h1>FAQs</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
              <li className="breadcrumb-item active">FAQs</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row w-100 justify-content-center">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                    <h5 className="card-title">All FAQs</h5>
                    <button
                      className="btn"
                      onClick={() => { resetForm(); setShowModal(true); }}
                      style={{ backgroundColor: "#e3d2b9", color: "2e2e2e" }}
                    >
                      <i className="fa fa-plus me-2"></i> Add FAQ
                    </button>
                  </div>

                  <LanguageSelector />

                  {faqs.length > 0 ? (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {faqs.map((faq, index) => (
                          <tr key={faq.id}>
                            <td>{index + 1}</td>
                            <td>{faq.question}</td>
                            <td>{faq.answer}</td>
                            <td>
                              <button className="btn btn-sm me-2" onClick={() => handleEdit(faq)} style={{ backgroundColor: "#e3d2b9" }}>
                                <i className="fa fa-edit" /> Edit
                              </button>
                              <button className="btn btn-sm btn-danger" onClick={() => { setFaqToDelete(faq); setShowDeleteModal(true); }}>
                                <i className="fa fa-trash me-2" /> Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No FAQs found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <BackToTop />

      {/* Alert Modal */}
      {showAlertModal && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#e3d2b9" }}>
                <h5 className="modal-title">{message.includes("Error") ? "Error" : "Success"}</h5>
                <button type="button" className="btn-close" onClick={closeAlert}></button>
              </div>
              <div className="modal-body">
                <p>{message}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="btn btn-secondary" onClick={closeAlert}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#e3d2b9" }}>
                <h5 className="modal-title">{editingFaq ? "Edit FAQ" : "Add FAQ"}</h5>
                <button type="button" className="btn-close " onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                  ></textarea>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button type="submit" className="btn" style={{ backgroundColor: "#e3d2b9" }}>
                      {formLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal show d-block"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#e3d2b9" }}>
                <h5 className="modal-title">Delete FAQ</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this FAQ?</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="btn btn-secondary me-2" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQ;
