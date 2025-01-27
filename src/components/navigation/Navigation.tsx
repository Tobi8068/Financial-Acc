import { useEffect, useState } from 'react';
import {
  BarChart3,
  FileText,
  Package,
  ShoppingCart,
  Users,
  Receipt,
  BookOpen,
  LayoutGrid,
  ClipboardCheck,
  FileBarChart,
  Package2,
  ClipboardList,
} from 'lucide-react';
import { NavItem } from './NavItem';
import { UserType } from '@/types/user';
import { useAuth } from '@/context/authProvider';

export function Navigation() {
  const { user } = useAuth();
  const [typeOfUser] = useState<UserType>(user?.role || '');

  const [navItems, setNavItems] = useState<JSX.Element>();

  useEffect(() => {
    console.log("type", typeOfUser)
    switch (typeOfUser) {
      case 'payable':
        setNavItems(
          <>
            <NavItem icon={BarChart3} label="Dashboard" />
            <NavItem icon={FileText} label="Invoice" />
            <NavItem icon={Package} label="Shipping" />
            <NavItem icon={ShoppingCart} label="Sales" />
            <NavItem icon={Users} label="Clients" />
            <NavItem icon={Receipt} label="Bills" />
            <NavItem icon={LayoutGrid} label="Purchase Order" />
            <NavItem icon={ClipboardList} label="Requisitions" />
            <NavItem icon={LayoutGrid} label="Suppliers" />
            <NavItem icon={BookOpen} label="Journal" />
            <NavItem icon={LayoutGrid} label="T-Account" />
            <NavItem icon={ClipboardCheck} label="Trial Balance" />
            <NavItem icon={FileBarChart} label="Financial Statement" />
          </>
        )
        break;
      case 'seller':
        setNavItems(
          <>
            {/* <NavItem icon={BarChart3} label="Dashboard" /> */}
            <NavItem icon={FileText} label="Invoice" />
            <NavItem icon={Package} label="Shipping" />
            <NavItem icon={ShoppingCart} label="Sales" />
            <NavItem icon={BarChart3} label="Quotation" />
          </>
        )
        break;
      case 'supplier':
        setNavItems(
          <>
            <NavItem icon={Package} label="Shipping" />
            <NavItem icon={Receipt} label="Bills" />
            <NavItem icon={LayoutGrid} label="Purchase Order" />
          </>
        )
        break;
      case 'buyer':
        setNavItems(
          <>
            <NavItem icon={Receipt} label="Bills" />
            <NavItem icon={Package} label="Shipping" />
            <NavItem icon={LayoutGrid} label="Purchase Order" />
            <NavItem icon={LayoutGrid} label="Reorder" />
            <NavItem icon={ClipboardList} label="Requisitions" />
          </>
        )
        break;
      case 'inventorymanager':
        setNavItems(
          <>
            <NavItem icon={Package2} label="Inventory" />
            <NavItem icon={Package} label="Shipping" />
            <NavItem icon={LayoutGrid} label="Issues" />
            <NavItem icon={LayoutGrid} label="Receptions" />
            <NavItem icon={LayoutGrid} label="Reservation" />
            <NavItem icon={LayoutGrid} label="Transferts" />
            <NavItem icon={LayoutGrid} label="Purchase Order" />
            <NavItem icon={LayoutGrid} label="Reorder" />
            <NavItem icon={ClipboardList} label="Requisitions" />
            <NavItem icon={LayoutGrid} label="Count" />
          </>
        )
        break;
      case 'storekeeper':
        setNavItems(
          <>
            <NavItem icon={Package} label="Shipping" />
            <NavItem icon={LayoutGrid} label="Receptions" />
            <NavItem icon={LayoutGrid} label="Reservation" />
            <NavItem icon={LayoutGrid} label="Transferts" />
            <NavItem icon={LayoutGrid} label="Purchase Order" />
            <NavItem icon={LayoutGrid} label="Reorder" />
            <NavItem icon={ClipboardList} label="Requisitions" />
          </>
        )
        break;
      case 'productionplanner':
        setNavItems(
          <>
            {/* <NavItem icon={BarChart3} label="Dashboard" /> */}
            <NavItem icon={ClipboardList} label="Requisitions" />
            <NavItem icon={LayoutGrid} label="Production" />
          </>
        )
        break;
      default:
        break;
    }
  }, [typeOfUser])

  return (
    <nav className="flex w-full gap-2 p-2">
      {navItems}
    </nav>
  );
}