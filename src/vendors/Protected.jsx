import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ Cmp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('emailtoken'); // Replace with your actual key
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login page
    }
  }, [navigate]);

  return Cmp ? <Cmp /> : null; // Render the passed component
};

export default Protected;

