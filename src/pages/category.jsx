import React, { useState } from 'react';
import Header from '../components/header_page';
import Sider from '../components/sider';
import Footer from '../components/footer';
import Select from 'react-select'; // Import react-select

export const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    allowAllZone: false,
    excludeAllZone: false,
    commissionRate: '',
    parent: '',
    image: '',
    icon: '',
    status: ''
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name) {
      setCategories([...categories, formData]);
      setFormData({
        name: '',
        slug: '',
        description: '',
        allowAllZone: false,
        excludeAllZone: false,
        commissionRate: '',
        parent: '',
        image: '',
        icon: '',
        status: ''
      });
    }
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Options for the category select
  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name
  }));

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
                  <h5 className="card-title">Select Category</h5>
                  {/* Use react-select for search functionality */}
                  <Select
                    options={categoryOptions}
                    onChange={(selectedOption) => {
                      const category = categories.find(
                        (cat) => cat.name === selectedOption.value
                      );
                      handleSelectCategory(category);
                    }}
                    placeholder="Select Category"
                  />
                  {selectedCategory && (
                    <div className="mt-3">
                      <h6>Selected Category:</h6>
                      <p><strong>Name:</strong> {selectedCategory.name}</p>
                      <p><strong>Slug:</strong> {selectedCategory.slug}</p>
                      <p><strong>Description:</strong> {selectedCategory.description}</p>
                      <p><strong>Status:</strong> {selectedCategory.status}</p>
                    </div>
                  )}
                  <h6 className="mt-4 ps-2">All Categories:</h6>
                  <ul>
                    {categories.map((category, index) => (
                      <li key={index}>{category.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Category Form</h5>
                  <form onSubmit={handleSubmit}>

                    {/* Category Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Slug */}
                    <div className="mb-3">
                      <label htmlFor="slug" className="form-label">Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Allow All Zone Checkbox */}
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="allowAllZone"
                        name="allowAllZone"
                        checked={formData.allowAllZone}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="allowAllZone">Allow All Zone</label>
                    </div>

                    {/* Exclude All Zone Checkbox */}
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="excludeAllZone"
                        name="excludeAllZone"
                        checked={formData.excludeAllZone}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="excludeAllZone">Exclude All Zone</label>
                    </div>

                    {/* Commission Rate */}
                    <div className="mb-3">
                      <label htmlFor="commissionRate" className="form-label">Commission Rate</label>
                      <input
                        type="number"
                        className="form-control"
                        id="commissionRate"
                        name="commissionRate"
                        value={formData.commissionRate}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Select Parent Category */}
                    {/* Select Parent Category */}
<div className="mb-3">
  <label htmlFor="parent" className="form-label">Select Parent</label>
  <select
    className="form-select"
    id="parent"
    name="parent"
    value={formData.parent}
    onChange={handleChange}
  >
    <option value="">Select Parent Category</option>
    {categories.map((category, index) => (
      <option key={index} value={category.name}>
        {category.name}
      </option>
    ))}
  </select>
</div>


                    {/* Image Upload Section with Preview */}
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image</label>
                      <div className="image-upload-container">
                        <label htmlFor="image" className="file-upload-btn">
                          {formData.image ? (
                            <img
                              src={URL.createObjectURL(formData.image)}
                              alt="Selected"
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
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Icon Upload Section */}
                    <div className="mb-3">
                      <label htmlFor="icon" className="form-label">Icon</label>
                      <div className="icon-upload-container">
                        <label htmlFor="icon" className="file-upload-btn">
                          {formData.icon ? (
                            <img
                              src={URL.createObjectURL(formData.icon)}
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
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>


                    {/* Status Dropdown */}
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Submit and Reset Buttons */}
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary me-2">Submit</button>
                      <button type="reset" className="btn btn-secondary">Reset</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>


          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Category;
