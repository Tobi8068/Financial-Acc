import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
interface NavItemProps {
  icon: LucideIcon;
  label: string;
}

export function NavItem({ icon: Icon, label }: NavItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === `/${label.toLowerCase().replace(" ", '-')}`;

  const handleClick = () => {
    if (label == 'Dashboard')
      navigate(`/`)
    else
      navigate(`/${label.toLowerCase().replace(" ", '-')}`)
  }
  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 rounded-lg transition-colors bg-white',
        isActive && 'hover:bg-gray-200'
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}