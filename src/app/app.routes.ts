import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'items-form',
    pathMatch: 'full',
  },
  {
    path: 'items-form',
    loadComponent: () =>
      import('./components/items-form/items-form.component').then(
        (m) => m.ItemsFormComponent
      ),
  },
  {
    path: 'invoice-summary',
    loadComponent: () =>
      import('./components/invoice-summary/invoice-summary.component').then(
        (m) => m.InvoiceSummaryComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'items-form',
  },
];
