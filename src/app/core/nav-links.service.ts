import { Injectable } from '@angular/core';
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Boxes,
  Users,
  ShoppingCart,
  Truck,
  Repeat,
  FileBarChart,
  Settings,
  type LucideIconData,
} from 'lucide-angular';

export interface NavLinkItem {
  to: string;
  label: string;
  icon: LucideIconData;
}

@Injectable({ providedIn: 'root' })
export class NavLinksService {
  readonly links: NavLinkItem[] = [
    { to: '/dashboard', label: 'Panel', icon: LayoutDashboard },
    { to: '/products', label: 'Məhsullar', icon: Package },
    { to: '/warehouses', label: 'Anbarlar', icon: Warehouse },
    { to: '/stock', label: 'Stok', icon: Boxes },
    { to: '/customers', label: 'Müştərilər', icon: Users },
    { to: '/orders', label: 'Satış', icon: ShoppingCart },
    { to: '/purchases', label: 'Satınalma', icon: Truck },
    { to: '/transfers', label: 'Hərəkətlər', icon: Repeat },
    { to: '/reports', label: 'Hesabatlar', icon: FileBarChart },
    { to: '/settings/password', label: 'Şifrə dəyişimi', icon: Settings },
  ];
}