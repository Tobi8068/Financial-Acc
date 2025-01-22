import { Bell, User } from 'lucide-react';
import { useAuth } from '@/context/authProvider';

export function Header() {
  const { user } = useAuth();
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#1D1E2B] border-b">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-white">Finances App</h1>
      </div>
      <div className='flex item-center gap-4'>
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Hi {user?.first_name} {user?.last_name}</span>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}