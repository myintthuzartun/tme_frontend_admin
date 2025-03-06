import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './vendors/Login'; // Ensure correct import path
import Register from './vendors/Register'; // Ensure correct import path
import Apply1 from './vendors/Apply1'; // Ensure correct import path
import Protected from './vendors/Protected';//Administrator
import AdminDashboard from './admin/Dashboard'; // Ensure file name matches
import AdminLogin from './admin/Login'; // Ensure file name matches
import ProtectedRoute from './admin/nav/ProtectedRoute'; // Import the ProtectedRoute component
import AdminVendorLevel from './admin/Vendor_Level_List'; // Import the AdminVendorLevel
import AdminBusiness from './admin/Business_List'; // Import the AdminBusiness
import AdminCategory from './admin/Category'; // Import the AdminCategory
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/apply1" element={<Protected Cmp={Apply1} />} />
      <Route path="/admin_login" element={<AdminLogin />} />
      <Route path="/admindashboard" element={<ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>} />
        <Route path="/adminvendorlevel" element={<AdminVendorLevel />} />
        <Route path="/adminbusiness" element={<AdminBusiness />} />
        <Route path="/admincategory" element={<AdminCategory />} />
        <Route path="/admincategory/:id" element={<AdminCategory />} />
    </Routes>
  );
}

export default App;
