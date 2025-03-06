import { useState, useEffect } from 'react';
import api from '../API'; // Axios instance
import { useNavigate } from 'react-router-dom';
//import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context
export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
 // const { setEmail } = useAuth(); // ✅ Get setEmail from context
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const login = () => {
    navigate("/");
  }
// Redirect to dashboard if user is already logged in
useEffect(() => {
  const storedEmail = sessionStorage.getItem('emailtoken'); // Retrieve emailtoken from sessionStorage
  if (storedEmail) {
    // Navigate to "/apply1" if token is found
    navigate("/apply1");
  }
}, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 8 characters!");
        return;
      }
      
  
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    try {
        const response = await api.post("/register", { email, password });

        console.log("Status:", response.status);
        console.log(response.data);

        // Redirect to Login.jsx on successful registration
        if (response.status === 200) {
           // Change to the correct route
         //  setEmail(email); // ✅ Store email in context
         navigate("/", { state: { email } });  
        }else{
            alert("Check Your Data");
        }
    } catch (error) {
        
            navigate("/register"); // Change to the correct route
        
    
       
    }
};

  return (
    <div>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
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
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p className="text-center small">Enter your details to register</p>
                      </div>

                      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-12">
                          <label className="form-label">Email</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text">@</span>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">Password</label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                            required
                          />
                        </div>

                        <div className="col-12">
                          <label className="form-label">Confirm Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            placeholder="Confirm Password"
                            required
                          />
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary w-100" type="submit">
                            Create Account
                          </button>
                        </div>

                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account?{" "}
                            <a href="#" onClick={login} style={{ textDecoration: "none", color: "#a37f67" }}>
                              <b>Log in</b>
                            </a>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="credits">
                    Designed by{" "}
                    <a href="http://goldentkm.com.mm/" style={{ textDecoration: "none", color: "#a37f67" }}>
                      <b> Golden TKM Co. Ltd.</b>
                    </a>
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

export default Register;
