import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";

const AuthRoutes = {
    path: "/",
    children: [
        {
            path: "/signin",
            element: <SignIn />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
    ]
}

export default AuthRoutes;