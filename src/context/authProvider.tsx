import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getInitialRouteForRole } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const initAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await verifyToken(token);
        }
        setIsLoading(false); 
    };

    useEffect(() => {
        initAuth();
    }, []);

    const verifyToken = async (token: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/loginWithToken`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUser(data);
            if (response.ok) {
                const locationState = location.state?.from;
                let redirectTo = '/';
                console.log(locationState, getInitialRouteForRole(data.role))
                if (locationState == '/' || locationState == undefined) {
                    redirectTo = getInitialRouteForRole(data.role);
                } else {
                    redirectTo = locationState;
                }
                console.log("Token Verify navigate to", redirectTo);
                navigate(redirectTo, { replace: true });
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        }
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
