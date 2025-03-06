import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../API'; // Ensure your API is correctly imported
export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Basic client-side validation before sending the request
        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        const userData = { email, password };

        try {
            // Send POST request to backend API for login
            let response = await fetch('http://127.0.0.1:8000/api/admin_login', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(userData),
            });

            let result = await response.json();

            // If login is unsuccessful, show the error message
            if (!response.ok) {
                setError(result.error || "Login failed!");
            } else {
                // Store user data in local storage and navigate to dashboard
                localStorage.setItem("user-info", JSON.stringify(result));
                navigate('/admindashboard');
            }

        } catch (err) {
            // Handle errors like network issues
            setError("Failed to connect to server");
        }
    };

    const handleCloseError = () => {
        setError(''); // Reset error message when alert is closed
    };

    return (
        <main>
            <div className="container">
                <section className="section login min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <div className="logo d-flex align-items-center w-auto">
                                    <img src="/vendor/assets/img/logo.ico" alt="" />
                                        <span className="d-block d-lg-none">Admin Login</span>
                                        <span className="d-none d-lg-block">Admin Login</span>
                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            <p className="text-center small">Enter your Email &amp; password to login</p>
                                        </div>

                                        {/* Display Bootstrap Alert if Error Exists */}
                                        {error && (
                                            <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center justify-content-center text-center" role="alert">
                                                {error}
                                                <i className="bi bi-emoji-frown ps-2" style={{ fontSize: '1.0rem' }}></i>

                                                {/* Handle closing of error alert */}
                                                <button type="button" className="btn-close ms-2" onClick={handleCloseError} aria-label="Close"></button>
                                            </div>
                                        )}

                                        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">Please enter your email.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    id="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>

                                            <div className="col-12">
                                                <button
                                                    className="btn btn-outline-light text-dark w-100"
                                                    type="submit"
                                                    style={{ backgroundColor: '#e3d2b9' }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f4f4f9'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#e3d2b9'}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="credits">
                                    Produced by <a href="https://goldentkm.mm" style={{ color: '#a37f67' }}>@Golden TKM It Education Center</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;
