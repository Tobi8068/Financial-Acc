import { useRoutes } from "react-router";
import MainRoute from "./Main";
import Auth from "./Auth";
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoute";
import ProtectedRoute from "./Protected";
// import { useAuth } from "@/context/authProvider";

export default function Routes() {
    // const { isAuthenticated } = useAuth();
    return useRoutes([
        {
            path: "auth",
            element: <Auth />,
            children: [AuthRoutes]
        },
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    element: <MainRoute />,
                    children: MainRoutes.children,
                }
            ]
        },
    ])
}