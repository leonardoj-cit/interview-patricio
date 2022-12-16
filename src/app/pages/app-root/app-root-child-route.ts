import { Routes } from '@angular/router';

import { AppRootRouteLink } from './shared/enums/app-root-route-link.enum';

export const appRootChildrenRoute: Routes = [
  { path: '', redirectTo: AppRootRouteLink.HOME, pathMatch: 'full' },
  {
    path: AppRootRouteLink.HOME,
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
    data: { title: 'Home', icon: 'home' },
  },
  {
    path: AppRootRouteLink.SELL,
    loadChildren: () => import('../product/product.module').then((m) => m.ProductModule),
    data: { title: 'Sell', icon: 'home' },
  },
  {
    path: AppRootRouteLink.CHECKOUT,
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
    data: { title: 'Checkout', icon: 'home' },
  },
];
