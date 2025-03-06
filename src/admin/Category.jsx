import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from './nav/Header_Page.jsx'; // ✅ Correct relative import
import Sider from './nav/Sider.jsx'; // ✅ Correct relative import
import Footer from './nav/Footer.jsx';
import Select from 'react-select'; // Import react-select
import Form from 'react-bootstrap/Form';
import ConfirmationModal from './ConfirmationModal';
import CategoryTree from './CategoryTree';

export const Category = () => {

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // 'add', 'update', 'delete', 'error'
  const [modalAction, setModalAction] = useState(null);
  const navigate = useNavigate()
  const { id } = useParams(); // Get ID from URL

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [commissionRate, setCommissionRate] = useState('');

  const [categories, setCategories] = useState([]); // For showing category tree
  const [parentCategories, setParentCategories] = useState([]); // For parent category dropdown
  const [selectedParent, setSelectedParent] = useState(''); // For selected parent category

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [icon, setIcon] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [status, setStatus] = useState(false);

  // Show modal with dynamic content
  const showModal = (title, message, type, action) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalAction(() => action);
    setModalShow(true);
  };

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setCommissionRate("");
    setSelectedParent(null);
    setImage(null);
    setImageFile(null);
    setIcon(null);
    setIconFile(null);
    setStatus(false);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Remove spaces from start and end
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-"); // Replace spaces with dashes
  };

  const buildCategoryTree = (categories, parentId = null) => {
    return categories
      .filter(category => category.parent_id === parentId)
      .map(category => ({
        ...category,
        children: buildCategoryTree(categories, category.id) // Recursively find children
      }));
  };

  const fetchParentCategory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/category');
      const result = await response.json();

      const categoryTree = buildCategoryTree(result);
      setCategories(categoryTree);

      const formattedCategories = result.map(category => ({
        value: category.id,
        label: category.name
      }));

      setParentCategories(formattedCategories);
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategory = async () => {
    if (!id) return;

    // resetForm(); // Reset form before fetching data

    try {
      let response = await fetch(`http://127.0.0.1:8000/api/category/${id}`);
      let result = await response.json();

      setName(result.name || "");
      setSlug(result.slug || "");
      setDescription(result.description || "");
      setCommissionRate(result.commission_rate || "");
      setSelectedParent(
        parentCategories.find(cat => cat.value === result.parent_id) || null
      );
      setImage(result.image || null);
      setIcon(result.icon || null);
      setStatus(result.status || false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch category and parent categories when `id` or `name` changes
  useEffect(() => {
    const fetchData = async () => {
      await fetchParentCategory(); // Fetch parent categories first
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // await fetchParentCategory(); // Fetch parent categories first
      if (id) {
        await fetchCategory(); // Then fetch the category
      }
    };

    fetchData();
  }, [id]);

  // Only update slug when name changes
  useEffect(() => {
    if (name) {
      setSlug(generateSlug(name));
    }
  }, [name]); // Avoid triggering effect on `id`

  async function handleSubmit(e) {
    e.preventDefault();

    // Create FormData object to handle files along with other form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('commission_rate', commissionRate);
    formData.append('parent', selectedParent?.value || '');  // Ensure null is sent
    formData.append('status', status ? 1 : 0);

    if (imageFile) formData.append('image', imageFile);  // Append image if selected
    if (iconFile) formData.append('icon', iconFile);    // Append icon if selected

    // Determine if creating or updating
    const url = id
      ? `http://127.0.0.1:8000/api/category/${id}?_method=PUT`
      : "http://127.0.0.1:8000/api/category";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData,  // Send FormData as the body of the request
      });

      const result = await response.json();

      if (response.ok) {
        showModal(
          "Success",
          id ? "Category updated successfully" : "Category added successfully",
          id ? "update" : "add",
          fetchParentCategory
        );
        resetForm();
      } else {
        showModal("Error", "Failed to save category", "error", null);
      }
    } catch (error) {
      showModal("Error", "An error occurred while inserting a new category.", "error", null);
    }
  }

  const handleDelete = async (id) => {
    showModal("Confirm Deletion", "Are you sure you want to delete this category?", "delete", async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/category/${id}`, {
          method: "DELETE",
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          showModal("Success", "Category deleted successfully!", "delete", () => {
            fetchParentCategory();
            resetForm();
            navigate("/category");
          });
        } else {
          const result = await response.json();
          showModal("Error", "Failed to delete category: " + result.message, "error", null);
        }
      } catch (error) {
        showModal("Error", "An error occurred while deleting the category.", "error", null);
      }
    });
  };

  // When image is selected (new file uploaded)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); // Create a preview URL
    setImageFile(file); // Save the file for submission
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    setIcon(URL.createObjectURL(file)); // Create a preview URL
    setIconFile(file); // Save the file for submission
  };

  return (
    <>
      <Header />
      <Sider />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Category Management</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">Forms</li>
              <li className="breadcrumb-item active">Category</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>Category</strong>
                  </h5>
                  <CategoryTree categories={categories} onDelete={handleDelete} />
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>Add Category</strong>
                  </h5>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">

                    {/* Category Name */}
                    <div className="row mb-3">
                      <div className="col-2 pt-2">
                        <label htmlFor="name" className="form-label">Name
                          &nbsp;<span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-10">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder='Enter Category Name'
                          required
                        />
                      </div>
                    </div>

                    {/* Slug */}
                    <div className="row mb-3">
                      <div className="col-2 pt-2">
                        <label htmlFor="slug" className="form-label">
                          Slug
                          &nbsp;<span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-10">
                        <input
                          type="text"
                          className="form-control"
                          id="slug"
                          name="slug"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder='Enter Slug'
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="row mb-3">
                      <div className="col-2 pt-2">
                        <label htmlFor="description" className="form-label">Description</label>
                      </div>
                      <div className="col-10">
                        <textarea
                          className="form-control"
                          id="description"
                          name="description"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder='Enter Description'
                        ></textarea>
                      </div>
                    </div>

                    {/* Commission Rate */}
                    <div className="row mb-3">
                      <div className="col-2 pt-2">
                        <label htmlFor="commissionRate" className="form-label">Commission Rate</label>
                      </div>
                      <div className="col-10">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            id="commissionRate"
                            name="commissionRate"
                            value={commissionRate}
                            onChange={(e) => setCommissionRate(e.target.value)}
                            placeholder="Enter Commission Rate"
                          />
                          <span className="input-group-text bg-light text-muted">%</span>
                        </div>
                        <small className="text-muted fst-italic">
                          *Define the percentage of earnings retained as commission.
                        </small>
                      </div>
                    </div>

                    {/* Select Parent Category */}
                    {/* Select Parent Category */}
                    <div className="row mb-3">
                      <div className="col-2 pt-2">
                        <label htmlFor="parent" className="form-label">Select Parent</label>
                      </div>
                      <div className="col-10">
                        <Select
                          options={parentCategories}
                          value={selectedParent}
                          onChange={(selectedOption) => {
                            console.log("Selected Parent:", selectedOption); // Debugging
                            setSelectedParent(selectedOption);
                          }}
                          placeholder="Select Parent Category"
                          isClearable
                        />
                      </div>
                    </div>


                    {/* Image Upload Section with Preview */}
                    <div className="mb-3 d-flex align-items-center">
                      <div className="col-2 pt-2">
                        <label htmlFor="image" className="form-label">Image</label>
                      </div>
                      <div className="col-10">
                        <div className="image-upload-container m-1">
                          <label htmlFor="image" className="file-upload-btn">
                            {image ? (
                              <img
                                src={image}
                                alt="Selected Image"
                                className="image-preview"
                              />
                            ) : (
                              <div className="plus-sign">+</div>
                            )}
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Icon Upload Section */}
                    <div className="mb-3 d-flex align-items-center">
                      <div className="col-2 pt-2">
                        <label htmlFor="icon" className="form-label">Icon</label>
                      </div>
                      <div className="col-10">
                        <div className="icon-upload-container m-1">
                          <label htmlFor="icon" className="file-upload-btn">
                            {icon ? (
                              <img
                                src={icon}
                                alt="Selected Icon"
                                className="icon-preview"
                              />
                            ) : (
                              <div className="plus-sign">+</div>
                            )}
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="icon"
                            name="icon"
                            onChange={handleIconChange}
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div>
                    </div>


                    {/* Status Dropdown */}
                    <div className="row mb-3 d-flex align-items-center">
                      <div className="col-2 pt-2">
                        <label htmlFor="status-switch" className="form-label">Status</label>
                      </div>
                      <div className="col-auto m-2">
                        <Form.Check
                          type="switch"
                          id="status-switch"
                          checked={status} // control the switch with status
                          onChange={(e) => setStatus(e.target.checked)} // update status based on the switch state
                          style={{
                            transform: 'scale(1.5)', // if you still want to scale the switch
                          }}
                        />
                      </div>
                    </div>

                    {/* Submit and Reset Buttons */}
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary me-2">
                        {id ? "Update" : "Submit"}
                      </button>
                      <Link to='/admincategory' className="btn btn-secondary" onClick={resetForm}>
                        Reset
                      </Link>
                    </div>
                  </form>
                </div>{/* .card-body end */}
              </div>{/* .card end */}
            </div>{/* col-lg-8 end */}
          </div>{/* .row end */}
        </section>{/* .section end */}
      </main>
      <Footer />

      {/* Modal for confirmation */}
      <ConfirmationModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleConfirm={() => {
          setModalShow(false);
          if (modalAction) modalAction();
        }}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </>
  );
};

export default Category;
