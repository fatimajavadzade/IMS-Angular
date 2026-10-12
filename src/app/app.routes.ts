import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout';
import { PAGE_TITLES } from './route.constant';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.dashboard,
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.products,
      },
      {
        path: 'warehouses',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.warehouses,
      },
      {
        path: 'stock',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.stock,
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./pages/customers/customer-list/customer-list').then(
            (m) => m.CustomerListComponent,
          ),
      },
      {
        path: 'customers/new',
        loadComponent: () =>
          import('./pages/customers/customer-create/customer-create').then(
            (m) => m.CustomerCreateComponent,
          ),
      },
      {
        path: 'customers/:id/edit',
        loadComponent: () =>
          import('./pages/customers/customer-edit/customer-edit').then(
            (m) => m.CustomerEditComponent,
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.orders,
      },
      {
        path: 'purchases',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.purchases,
      },
      {
        path: 'transfers',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.transfers,
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.reports,
      },
      {
        path: 'settings/password',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoonComponent),
        data: PAGE_TITLES.settings,
      },
    ],
  },
  {
    path: 'support',
    loadComponent: () => import('./pages/support/support').then((m) => m.SupportComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
