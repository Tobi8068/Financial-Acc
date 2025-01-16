import { Header } from "@/components/layout/Header";
import { Navigation } from '@/components/navigation/Navigation';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem('loggedInUser') !== null;
  const location = useLocation();

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