export enum RouteConstant {
  LOGIN = 'login',
  REGISTER = 'register',
  DASHBOARD = 'dashboard',
  PRODUCTS = 'products',
  WAREHOUSES = 'warehouses',
  STOCK = 'stock',
  CUSTOMERS = 'customers',
  ORDERS = 'orders',
  PURCHASES = 'purchases',
  REPORTS = 'reports',
  TRANSFERS = 'transfers',
  SETTINGS = 'settings',
}

export const PAGE_TITLES: Record<RouteConstant, { title: string; subtitle: string }> = {
  [RouteConstant.LOGIN]: { title: 'Login', subtitle: 'Please enter your credentials to log in.' },
  [RouteConstant.REGISTER]: { title: 'Register', subtitle: 'Create a new account.' },
  [RouteConstant.DASHBOARD]: { title: 'Dashboard', subtitle: 'Overview of your application.' },
  [RouteConstant.PRODUCTS]: { title: 'Products', subtitle: 'List of available products.' },
  [RouteConstant.WAREHOUSES]: {
    title: 'Warehouses',
    subtitle: 'Anbarların siyahısı bu bölmədə olacaq.',
  },
  [RouteConstant.STOCK]: { title: 'Stock', subtitle: 'Stok hərəkətləri bu bölmədə olacaq.' },
  [RouteConstant.CUSTOMERS]: {
    title: 'Customers',
    subtitle: 'Müştəri siyahısı bu bölmədə olacaq.',
  },
  [RouteConstant.ORDERS]: { title: 'Orders', subtitle: 'Satış sifarişləri bu bölmədə olacaq.' },
  [RouteConstant.PURCHASES]: {
    title: 'Purchases',
    subtitle: 'Satınalma sifarişləri bu bölmədə olacaq.',
  },
  [RouteConstant.REPORTS]: { title: 'Reports', subtitle: 'Hesabatlar bu bölmədə olacaq.' },
  [RouteConstant.SETTINGS]: { title: 'Settings', subtitle: 'Ayarlar bu bölmədə olacaq.' },
  [RouteConstant.TRANSFERS]: {
    title: 'Transfers',
    subtitle: 'Transfer details will be available here.',
  },
};