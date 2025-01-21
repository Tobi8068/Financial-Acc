import { Header } from "@/components/layout/Header";
import { Navigation } from '@/components/navigation/Navigation';
import { Outlet } from 'react-router-dom';

const MainRoute = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className='mx-8'>
        <Outlet />
      </div>
    </div>
  )
};

export default MainRoute;