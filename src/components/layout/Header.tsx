
import { Bell, User, LogOut } from 'lucide-react';
import { getUserAvatarPath } from '@/lib/utils'
import { useAuth } from '@/context/authProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
const capitalizeUserName = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function Header() {

  const { user, logout } = useAuth();
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
          <span className="text-sm font-medium text-white">
            {user?.first_name && capitalizeUserName(user.first_name)} {user?.last_name && capitalizeUserName(user.last_name)}
          </span>
        </div>

        <Avatar className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
                    {user ? (
                      <>
                        <AvatarImage src={getUserAvatarPath(user.avatar)} alt={user.first_name} />
                        <AvatarFallback>
                          {user.first_name[0]?.toUpperCase()}
                          {user.last_name[0]?.toUpperCase()}
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/default-avatar.png" alt="Guest" />
                        <AvatarFallback>
                          <User className="h-6 w-6 text-gray-600" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  {user && (
                    <>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => logout()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <User className="h-6 w-6 text-gray-600" />
          )}
        </Avatar>
      </div>
    </header>
  );
}