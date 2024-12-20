import { useState } from 'react';
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

export function Navigation() {
  const [typeOfUser] = useState<UserType>('Production_Planner');

  let navItems;

  switch (typeOfUser) {
    case 'Payables':
      navItems = (
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
    case 'Seller':
      navItems = (
        <>
          <NavItem icon={BarChart3} label="Dashboard" />
          <NavItem icon={FileText} label="Invoice" />
          <NavItem icon={Package} label="Shipping" />
          <NavItem icon={ShoppingCart} label="Sales" />
        </>
      )
      break;
    case 'Buyer':
      navItems = (
        <>
          <NavItem icon={BarChart3} label="Dashboard" />
          <NavItem icon={Receipt} label="Bills" />
          <NavItem icon={Package} label="Shipping" />
          <NavItem icon={LayoutGrid} label="Purchase Order" />
          <NavItem icon={LayoutGrid} label="Reorder" />
          <NavItem icon={ClipboardList} label="Requisitions" />
        </>
      )
      break;
    case 'Inventory_Manager':
      navItems = (
        <>
          <NavItem icon={BarChart3} label="Dashboard" />
          <NavItem icon={Package2} label="Inventory" />
          <NavItem icon={Package} label="Shipping" />
          <NavItem icon={LayoutGrid} label="Issues" />
          <NavItem icon={LayoutGrid} label="Receptions" />
          <NavItem icon={LayoutGrid} label="Reservation" />
          <NavItem icon={LayoutGrid} label="Transfers" />
          <NavItem icon={LayoutGrid} label="Purchase Order" />
          <NavItem icon={LayoutGrid} label="Reorder" />
          <NavItem icon={ClipboardList} label="Requisitions" />
          <NavItem icon={LayoutGrid} label="Count" />
        </>
      )
      break;
    case 'Store_Keeper':
      navItems = (
        <>
          <NavItem icon={BarChart3} label="Dashboard" />
          <NavItem icon={Package} label="Shipping" />
          <NavItem icon={LayoutGrid} label="Receptions" />
          <NavItem icon={LayoutGrid} label="Reservation" />
          <NavItem icon={LayoutGrid} label="Transfers" />
          <NavItem icon={LayoutGrid} label="Purchase Order" />
          <NavItem icon={LayoutGrid} label="Reorder" />
          <NavItem icon={ClipboardList} label="Requisitions" />
        </>
      )
      break;
    case 'Production_Planner':
      navItems = (
        <>
          <NavItem icon={BarChart3} label="Dashboard" />
          <NavItem icon={ClipboardList} label="Requisitions" />
          <NavItem icon={LayoutGrid} label="Production" />
        </>
      )
      break;
    default:
      break;
  }
  return (
    <nav className="flex w-full gap-2 p-2">
      {navItems}
    </nav>
  );
}