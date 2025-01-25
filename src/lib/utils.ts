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

export const isRouteAllowedForRole = (route: string, role: string) => {
    const roleRoutes: any = {
        payable: ['/dashboard', '/invoice', '/shipping', '/sales', '/clients', '/bills', '/purchase-order', '/requisitions', '/suppliers', '/journal', '/t-account', '/trial-balance', '/financial-statement'],
        seller: ['/invoice', '/shipping', '/sales', '/quotation'],
        supplier: ['/shipping', '/bills', '/purchase-order'],
        buyer: ['/bills', '/shipping', '/purchase-order', '/reorder', '/requisitions'],
        inventorymanager: ['/inventory', '/shipping', '/issues', '/receptions', '/reservation', '/transfers', '/purchase-order', '/reorder', '/requisitions', '/count'],
        storekeeper: ['/shipping', '/receptions', '/reservation', '/transfers', '/purchase-order', '/reorder', '/requisitions'],
        productionplanner: ['/requisitions', '/production']
    };
    
    return roleRoutes[role]?.includes(route) || false;
}
