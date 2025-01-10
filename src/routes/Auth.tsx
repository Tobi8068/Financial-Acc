import { Outlet } from 'react-router-dom';
import { Navbar } from "@/components/auth/Navbar";
import { Footer } from "@/components/auth/Footer";

const Auth = () => {
    return (
        <div className='flex flex-col justify-between h-[100vh]'>
            <Navbar />
            <div className='mx-8'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
};

export default Auth;