import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import api from '../API'; // Ensure your API is correctly imported
import { useLocation } from 'react-router-dom';
export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get state from the navigation
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('emailtoken'); // Retrieve emailtoken from sessionStorage
    if (storedEmail) {
      // Navigate to "/apply1" if token is found
      navigate("/apply1");
    }
  }, [navigate]);

  const register = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
  
    
      
    else{
  
    try {
      const response = await api.post("/login", { email, password }); // Adjust URL

      if (response.status === 200) {
      //  sessionStorage.setItem('email', email); 
        navigate("/apply1", { state: { email } });
     // navigate("/apply1");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    }
  };
  }
  return (
    <div>
      <main>
        <div className="container">
          <section className="section profile">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                      <img src="/vendor/assets/img/logo.ico" alt="" />
                      <span className="d-none d-lg-block">Vendor Admin</span>
                    </a>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-2">
                        <h5 className="card-title text-center fs-4">Login to Your Account</h5>
                        <p className="text-center small">Enter your username &amp; password to login</p>
                      </div>
                      <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">Email</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend">@</span>
                            <input
                              type="email"
                              value={email}
                          
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                          />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                          <button className="btn btn-primary w-50" type="submit">Login</button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100">
                            <img src="https://www.google.com/favicon.ico" alt="Google Logo" className="w-5 h-5" />
                            <span className="text-gray-700 font-medium">Sign in with Google</span>
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have account? <a href="#" onClick={register} style={{ textDecoration: "none", color: "#a37f67" }}><b>Create an account</b></a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="credits">
                    Designed by <a href="http://goldentkm.com.mm/" style={{ textDecoration: "none", color: "#a37f67" }}><b>Golden TKM Co. Ltd.</b></a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
