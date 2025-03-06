import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('user-info'));
            
            if (!userInfo) {
                navigate('/login');
            } else {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Error parsing user info:", error);
            navigate('/login');
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return null; // Prevents rendering children until authentication is checked
    }

    return <>{children}</>;
};

export default ProtectedRoute;
