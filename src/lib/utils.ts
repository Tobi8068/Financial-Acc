import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeLetter = (string: string): string => {
  return string
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');
};

export const getInitialRouteForRole = (role: string) => {
  switch(role) {
      case 'payable':
          return '/dashboard';
      case 'seller':
          return '/invoice';
      case 'supplier':
          return '/shipping';
      case 'buyer':
          return '/bills';
      case 'inventorymanager':
          return '/inventory';
      case 'storekeeper':
          return '/shipping';
      case 'productionplanner':
          return '/requisitions';
      default:
          return '/';
  }
}

export const getUserAvatarPath = (avatar: string) => {
  return `${import.meta.env.VITE_HOST_URL}${avatar}`;
}