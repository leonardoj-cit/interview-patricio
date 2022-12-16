import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { appRootChildrenRoute } from './app-root-child-route';
import { AppRootComponent } from './app-root.component';

const routes: Routes = [
  {
    path: '',
    component: AppRootComponent,
    children: appRootChildrenRoute,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRootRoutingModule {}
