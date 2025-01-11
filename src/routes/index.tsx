import { useRoutes } from "react-router";
import MainRoutes from "./routes/MainRoutes";
import ProtectedRoute from "./Protect";
import Auth from "./Auth";
import AuthRoutes from "./routes/AuthRoute";
// import AdminRoute from "./AdminRoute";


export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [MainRoutes],
        },
        {
            path: "/",
            element: <Auth />,
            children: [AuthRoutes]
        },
    ])
}