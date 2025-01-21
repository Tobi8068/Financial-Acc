import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authProvider';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/signin" state={{ from: location.pathname }} replace />;
    }
    return <Outlet />;
}