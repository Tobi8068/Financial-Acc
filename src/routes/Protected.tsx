import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authProvider';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
}