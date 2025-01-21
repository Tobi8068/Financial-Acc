import { Header } from "@/components/layout/Header";
import { Navigation } from '@/components/navigation/Navigation';
import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/loginWithToken`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return !isLoggedIn ? (
    <div>
      <Header />
      <Navigation />
      <div className='mx-8'>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;