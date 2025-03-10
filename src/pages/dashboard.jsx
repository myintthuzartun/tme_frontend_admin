import React from 'react';
import Header from '../components/header_page'; // ✅ Correct relative import
import Sider from '../components/sider'; // ✅ Correct relative import
import Footer from '../components/footer'; // ✅ Correct relative import
import { motion } from "motion/react";
import BackToTop from "../components/back_to_top";

export const Dashboard = () => {
  return (
    <>
      <Header />
      <Sider />
      <motion.main className="main" id="main"
            initial={{ opacity: 0, y:40 }}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration: 0.5 }}
        >
   
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Revenue <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        {/* Icon Container with fixed width and height */}
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: '50px',
                            height: '50px',

                          }}
                        >
                          <i
                            className="bi bi-wallet"
                            style={{ fontSize: '1.5rem' }}
                          ></i>
                        </div>
                        {/* Price Text */}
                        <div className="ps-3">
                          <h6 style={{ fontSize: '1.3rem', margin: 0 }}>
                            44,340,000 MMK
                          </h6>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card revenue-card">
                    {/* don't change the icon and its color */}
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Sales <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        {/* Icon Container with fixed width and height */}
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px", backgroundColor: '#87CEEB', /* Sky Blue */ color: 'white' /* White icon color */ }}
                        >
                          <i
                            className="bi bi-cart"
                            style={{ fontSize: "1.5rem", color: 'white' }}
                          ></i>
                        </div>

                        {/* Price Text */}
                        <div className="ps-3">
                          <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                            145
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card revenue-card">
                    {/* don't change the icon and its color */}
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Customer <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        {/* Icon Container with fixed width and height */}
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px", backgroundColor: '#FF7F50', /* Coral */ color: 'white' /* White icon color */ }}
                        >
                          <i
                            className="bi bi-people"
                            style={{ fontSize: "1.5rem", color: 'white' }}
                          ></i>
                        </div>

                        {/* Price Text */}
                        <div className="ps-2">
                          <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                            1244
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card revenue-card">
                    {/* don't change the icon and its color */}
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Total Products <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        {/* Icon Container with fixed width and height */}
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px", backgroundColor: '#F08080', /* Coral */ color: 'white' /* White icon color */ }}
                        >
                          <i
                            className="bi bi-box"
                            style={{ fontSize: "1.5rem", color: 'white' }}
                          ></i>
                        </div>

                        {/* Price Text */}
                        <div className="ps-2">
                          <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                            170
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card revenue-card">
                    {/* don't change the icon and its color */}
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Total Stores <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        {/* Icon Container with fixed width and height */}
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px", backgroundColor: '#FFD580', /* Coral */ color: 'white' /* White icon color */ }}
                        >
                          <i
                            className="bi bi-shop"
                            style={{ fontSize: "1.5rem", color: 'white' }}
                          ></i>
                        </div>

                        {/* Price Text */}
                        <div className="ps-2">
                          <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                            18
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card revenue-card">
                    {/* don't change the icon and its color */}
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Total Orders <span>| This Month</span>
                      </h5>
                      <div className="d-flex align-items-center">
                        {/* Icon Container with fixed width and height */}
                        <div
                          className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px", backgroundColor: '#FFDAB9', /* Coral */ color: 'white' /* White icon color */ }}
                        >
                          <i
                            className="bi bi-bag"
                            style={{ fontSize: "1.5rem", color: 'white' }}
                          ></i>
                        </div>

                        {/* Price Text */}
                        <div className="ps-2">
                          <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                            170
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>


                <div className="container py-4">
                  {/* Order Status Header */}
                  <div className="d-flex justify-content-start mt-4">
                    <h3>Order Status</h3>
                  </div>

                  <div className="row mt-4">
                    {/* Total Orders Card */}
                    <div className="col-xxl-3 col-md-4 mb-4">
                      <div className="card info-card revenue-card">
                        {/* Dropdown filter */}
                        <div className="filter">
                          <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                Today
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Month
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Year
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <h5 className="card-title">
                            Pending <span>| This Month</span>
                          </h5>
                          <div className="d-flex align-items-center">
                            {/* Icon Container */}
                            <div
                              className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: '#f0ad4e', /* Coral color */
                                color: 'white' /* White icon color */
                              }}
                            >
                              <i className="bi bi-clock" style={{ fontSize: "1.5rem", color: 'white' }} />
                            </div>

                            {/* Price Text */}
                            <div className="ps-2">
                              <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                                17
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-4 mb-4">
                      <div className="card info-card revenue-card">
                        {/* Dropdown filter */}
                        <div className="filter">
                          <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                Today
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Month
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Year
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <h5 className="card-title">
                            Processing <span>| This Month</span>
                          </h5>
                          <div className="d-flex align-items-center">
                            {/* Icon Container */}
                            <div
                              className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: '#5bc0de', /* Coral color */
                                color: 'white' /* White icon color */
                              }}
                            >
                              <i className="bi bi-hourglass-split" style={{ fontSize: "1.5rem", color: 'white' }} />
                            </div>

                            {/* Price Text */}
                            <div className="ps-2">
                              <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                                17
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-3 col-md-4 mb-4">
                      <div className="card info-card revenue-card">
                        {/* Dropdown filter */}
                        <div className="filter">
                          <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                Today
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Month
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Year
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <h5 className="card-title">
                            Cancelled <span>| This Month</span>
                          </h5>
                          <div className="d-flex align-items-center">
                            {/* Icon Container */}
                            <div
                              className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: '#dc3545', /* Coral color */
                                color: 'white' /* White icon color */
                              }}
                            >
                              <i className="bi  bi-x-circle" style={{ fontSize: "1.5rem", color: 'white' }} />
                            </div>

                            {/* Price Text */}
                            <div className="ps-2">
                              <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                                0
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-3 col-md-4 mb-4">
                      <div className="card info-card revenue-card">
                        {/* Dropdown filter */}
                        <div className="filter">
                          <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                Today
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Month
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Year
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <h5 className="card-title">
                            Shipped <span>| This Month</span>
                          </h5>
                          <div className="d-flex align-items-center">
                            {/* Icon Container */}
                            <div
                              className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: '#28a745', /* Coral color */
                                color: 'white' /* White icon color */
                              }}
                            >
                              <i className="bi bi-truck" style={{ fontSize: "1.5rem", color: 'white' }} />
                            </div>

                            {/* Price Text */}
                            <div className="ps-2">
                              <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                                1
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-4 mb-4">
                      <div className="card info-card revenue-card">
                        {/* Dropdown filter */}
                        <div className="filter">
                          <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                Today
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Month
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Year
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <h5 className="card-title">
                            Out of Delivery <span>| This Month</span>
                          </h5>
                          <div className="d-flex align-items-center">
                            {/* Icon Container */}
                            <div
                              className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: '#FFA500', /* Coral color */
                                color: 'white' /* White icon color */
                              }}
                            >
                              <i className="bi bi-box-arrow-up" style={{ fontSize: "1.5rem", color: 'white' }} />
                            </div>

                            {/* Price Text */}
                            <div className="ps-2">
                              <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                                0
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-3 col-md-4 mb-4">
                      <div className="card info-card revenue-card">
                        {/* Dropdown filter */}
                        <div className="filter">
                          <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                            <i className="bi bi-three-dots" />
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <li className="dropdown-header text-start">
                              <h6>Filter</h6>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                Today
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Month
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/dashboard">
                                This Year
                              </a>
                            </li>
                          </ul>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <h5 className="card-title">
                            Delivered<span>| This Month</span>
                          </h5>
                          <div className="d-flex align-items-center">
                            {/* Icon Container */}
                            <div
                              className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: "50px",
                                height: "50px",
                                backgroundColor: '#4CAF50', /* Coral color */
                                color: 'white' /* White icon color */
                              }}
                            >
                              <i className="bi bi-check-circle" style={{ fontSize: "1.5rem", color: 'white' }} />
                            </div>

                            {/* Price Text */}
                            <div className="ps-2">
                              <h6 style={{ fontSize: "1.3rem", margin: 0 }}>
                                170
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* You can add more cards here by following the same structure */}
                  </div>
                </div>



              
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Recent Sales <span>| Today</span>
                      </h5>
                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">#2457</a>
                            </th>
                            <td>Brandon Jacob</td>
                            <td>
                              <a class="text-dark" href="/dashboard">
                                At praesentium minu
                              </a>
                            </td>
                            <td>134,400 MMK</td>
                            <td>
                              <span class="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">#2147</a>
                            </th>
                            <td>Bridie Kessler</td>
                            <td>
                              <a class="text-dark" href="/dashboard">
                                Blanditiis dolor omnis similique
                              </a>
                            </td>
                            <td>98,700 MMK</td>
                            <td>
                              <span class="badge bg-warning">Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">#2049</a>
                            </th>
                            <td>Ashleigh Langosh</td>
                            <td>
                              <a class="text-dark" href="/dashboard">
                                At recusandae consectetur
                              </a>
                            </td>
                            <td>308,700 MMK</td>
                            <td>
                              <span class="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">#2644</a>
                            </th>
                            <td>Angus Grady</td>
                            <td>
                              <a class="" href="/dashboard">
                                Ut voluptatem id earum et
                              </a>
                            </td>
                            <td>140,700 MMK</td>
                            <td>
                              <span class="badge bg-danger">Rejected</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">#2644</a>
                            </th>
                            <td>Raheem Lehner</td>
                            <td>
                              <a class="text-dark" href="/dashboard">
                                Sunt similique distinctio
                              </a>
                            </td>
                            <td>346,500 MMK</td>
                            <td>
                              <span class="badge bg-success">Approved</span>
                            </td>
                          </tr>
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="filter">

                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        Top Store <span>| This Month</span>
                      </h5>
                      <div className="filter">
                        <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                          <i className="bi bi-three-dots" />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                          <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/dashboard">
                              Today
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/dashboard">
                              This Month
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/dashboard">
                              This Year
                            </a>
                          </li>
                        </ul>
                      </div>
                      <table class="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Store Name</th>
                            <th scope="col">Orders</th>
                            <th scope="col">Earnings</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">#1</th>
                            <td>Store A</td>
                            <td>152</td>
                            <td>6,720,000 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">#2</th>
                            <td>Store B</td>
                            <td>120</td>
                            <td>5,880,000 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">#3</th>
                            <td>Store C</td>
                            <td>98</td>
                            <td>3,150,000 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">#4</th>
                            <td>Store D</td>
                            <td>85</td>
                            <td>2,520,000 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">#5</th>
                            <td>Store E</td>
                            <td>65</td>
                            <td>1,995,000 MMK</td>
                          </tr>
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>



                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/dashboard">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="card-body pb-0">
                      <h5 className="card-title">
                        Top Selling <span>| Today</span>
                      </h5>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">
                                <img alt="" src="assets/img/product-1.jpg" />
                              </a>
                            </th>
                            <td>
                              <a class="text-dark fw-bold" href="/dashboard">
                                Ut inventore ipsa voluptas nulla
                              </a>
                            </td>
                            <td>459,000 MMK</td>
                            <td class="fw-bold">124</td>
                            <td>12,219,600 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">
                                <img alt="" src="assets/img/product-2.jpg" />
                              </a>
                            </th>
                            <td>
                              <a class="text-dark fw-bold" href="/dashboard">
                                Exercitationem similique doloremque
                              </a>
                            </td>
                            <td>96,600 MMK</td>
                            <td class="fw-bold">98</td>
                            <td>9,014,400 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">
                                <img alt="" src="assets/img/product-3.jpg" />
                              </a>
                            </th>
                            <td>
                              <a class="text-dark fw-bold" href="/dashboard">
                                Doloribus nisi exercitationem
                              </a>
                            </td>
                            <td>123,900 MMK</td>
                            <td class="fw-bold">74</td>
                            <td>8,396,400 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">
                                <img alt="" src="assets/img/product-4.jpg" />
                              </a>
                            </th>
                            <td>
                              <a class="text-dark fw-bold" href="/dashboard">
                                Officiis quaerat sint rerum error
                              </a>
                            </td>
                            <td>67,200 MMK</td>
                            <td class="fw-bold">63</td>
                            <td>4,410,600 MMK</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="/dashboard">
                                <img alt="" src="assets/img/product-5.jpg" />
                              </a>
                            </th>
                            <td>
                              <a class="text-dark fw-bold" href="/dashboard">
                                Sit unde debitis delectus repellendus
                              </a>
                            </td>
                            <td>165,900 MMK</td>
                            <td class="fw-bold">41</td>
                            <td>6,392,900 MMK</td>
                          </tr>
                        </tbody>

                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="filter">
                      <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
                        <i className="bi bi-three-dots" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="/dashboard">Today</a></li>
                        <li><a className="dropdown-item" href="/dashboard">This Month</a></li>
                        <li><a className="dropdown-item" href="/dashboard">This Year</a></li>
                      </ul>
                    </div>
                    <div className="card-body pb-0">
                      <h5 className="card-title">
                        Recent Orders <span>| Today</span>
                      </h5>
                      <>

                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">Number</th>
                              <th scope="col">Name</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Total</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">#1</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Ut inventore ipsa voluptas nulla
                                </a>
                              </td>
                              <td>134,400 MMK</td> {/* 64 * 2,100 */}
                              <td className="fw-bold">124</td>
                              <td>12,238,800 MMK</td> {/* 5,828 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#2</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Exercitationem similique doloremque
                                </a>
                              </td>
                              <td>96,600 MMK</td> {/* 46 * 2,100 */}
                              <td className="fw-bold">98</td>
                              <td>9,466,800 MMK</td> {/* 4,508 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#3</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Doloribus nisi exercitationem
                                </a>
                              </td>
                              <td>123,900 MMK</td> {/* 59 * 2,100 */}
                              <td className="fw-bold">74</td>
                              <td>9,168,600 MMK</td> {/* 4,366 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#4</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Officiis quaerat sint rerum error
                                </a>
                              </td>
                              <td>67,200 MMK</td> {/* 32 * 2,100 */}
                              <td className="fw-bold">63</td>
                              <td>4,233,600 MMK</td> {/* 2,016 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#5</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Sit unde debitis delectus repellendus
                                </a>
                              </td>
                              <td>165,900 MMK</td> {/* 79 * 2,100 */}
                              <td className="fw-bold">41</td>
                              <td>6,801,900 MMK</td> {/* 3,239 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#6</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Consequuntur alias reiciendis minima
                                </a>
                              </td>
                              <td>105,000 MMK</td> {/* 50 * 2,100 */}
                              <td className="fw-bold">88</td>
                              <td>9,240,000 MMK</td> {/* 4,400 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#7</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Tempora nihil dignissimos officiis
                                </a>
                              </td>
                              <td>88,200 MMK</td> {/* 42 * 2,100 */}
                              <td className="fw-bold">76</td>
                              <td>6,703,200 MMK</td> {/* 3,192 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#8</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Alias sed molestiae tenetur
                                </a>
                              </td>
                              <td>142,800 MMK</td> {/* 68 * 2,100 */}
                              <td className="fw-bold">92</td>
                              <td>13,137,600 MMK</td> {/* 6,256 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#9</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Explicabo aliquid distinctio vel
                                </a>
                              </td>
                              <td>115,500 MMK</td> {/* 55 * 2,100 */}
                              <td className="fw-bold">69</td>
                              <td>7,969,500 MMK</td> {/* 3,795 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">#10</th>
                              <td>
                                <a className="text-dark fw-bold" href="/dashboard">
                                  Veritatis quibusdam perspiciatis
                                </a>
                              </td>
                              <td>149,100 MMK</td> {/* 71 * 2,100 */}
                              <td className="fw-bold">84</td>
                              <td>12,524,400 MMK</td> {/* 5,964 * 2,100 */}
                              <td>
                                <a href="/dashboard" className="text-dark">
                                  <i className="bi bi-eye" style={{ color: "#a37f67" }} />
                                </a>
                              </td>
                            </tr>
                          </tbody>

                        </table>

                      </>

                    </div>
                  </div>
                </div>



                <div className="col-12  mt-4">
  <div className="card">
    <div className="filter d-flex justify-content-between align-items-center p-3">
      <div>
        <a className="icon" data-bs-toggle="dropdown" href="/dashboard">
          <i className="bi bi-three-dots" />
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>
          <li>
            <a className="dropdown-item" href="/dashboard">
              Today
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/dashboard">
              This Month
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/dashboard">
              This Year
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="card-body">
      <h5 className="card-title">
        Product Stock Report<span>/Today</span>
      </h5>
      <div id="reportsChart" />
      <div className="table-responsive">
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Stock</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="assets/img/product-1.jpg" alt="Product" className="img-fluid" width="60" height="60" />
              </td>
              <td>Product A</td>
              <td>120</td>
              <td>
                <span className="badge bg-success">In Stock</span>
              </td>
              <td>
                <a href="/dashboard" className="text-dark">
                  <i className="bi bi-pencil" style={{ color: "#a37f67" }}></i>
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <img src="assets/img/product-2.jpg" alt="Product" className="img-fluid" width="60" height="60" />
              </td>
              <td>Product B</td>
              <td>85</td>
              <td>
                <span className="badge bg-danger">Out of Stock</span>
              </td>
              <td>
                <a href="/dashboard" className="text-dark">
                  <i className="bi bi-pencil" style={{ color: "#a37f67" }}></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
              </div>
            </div>

          </div>
        </section>
        
      </motion.main>
      <BackToTop />
      <Footer />
      
    </>
    
  )
};

export default Dashboard;
