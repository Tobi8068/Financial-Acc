import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import { RouteObject, Navigate } from 'react-router-dom';

const AuthRoutes: RouteObject = {
    children: [
        {
            path: 'signin',
            element: <SignIn />
        },
        {
            path: 'signup',
            element: <SignUp />
        },
        {
            path: '*',
            element: <Navigate to="signin" replace />  // Redirect any unknown auth routes to signin
        }
    ]
};

export default AuthRoutes;