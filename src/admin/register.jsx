import React, { useState } from 'react';
import Header from '../components/header_page';
import Sider from '../components/sider';
import Footer from '../components/footer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Handle Registration
  const signUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);
    setSuccess(false);

    let item = { name, password, email };
    console.log("Submitting:", item); // Debugging

    try {
      let response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify(item),
      });

      let result = await response.json();
      console.log("API Response:", result); // Debugging API response

      // Ensure `result` is not undefined
      if (response.ok) {
        localStorage.setItem("user-info", JSON.stringify(result)); // ✅ Store entire response
        setSuccess(true);
        navigate('/register'); // Redirect after successful registration
      } else {
        setError(result.message || "Registration failed!");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />
      <Sider />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Register</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Register</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h5 className="card-title text-center">Register Form</h5>

                  {/* Success or Error Messages */}
                  {success && <div className="alert alert-success">Registration successful!</div>}
                  {error && <div className="alert alert-danger">{error}</div>}

                  {/* Registration Form */}
                  <form onSubmit={signUp}>
                    {/* Name Input */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    {/* Password Input */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                      </button>
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

export default Register;