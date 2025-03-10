import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/* Pages  */
import Dashboard from './pages/dashboard'; // Ensure file name matches
import Category from './pages/category'; // Ensure file name matches
import Register from './pages/register'; // Ensure file name matches
import Login from './pages/login'; // Ensure file name matches
import ProtectedRoute from './components/protectedroute'; // Import the ProtectedRoute component
import VendorLevelList from "./pages/Vendor_Level_List";
import BusinessList from "./pages/Business_Name_List";
import BackToTop from "./components/back_to_top";
import Profile from "./pages/Profile";
import Currency from "./pages/Currency_Exchange";
import FAQ from "./pages/FAQ";
import './components/i18n'; // Import i18n configuration




function App() {
  return (

    <Router>
      <Routes>
        {/* Route for Login - Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/vendor-levels" element={<ProtectedRoute><VendorLevelList /></ProtectedRoute>}/>
        <Route path="/all_business" element={<ProtectedRoute><BusinessList /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/currency" element={<ProtectedRoute><Currency /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />

       


      </Routes>
    </Router>

  );
}

export default App;
