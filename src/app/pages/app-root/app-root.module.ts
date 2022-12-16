import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule, MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { AppRootRoutingModule } from './app-root-routing.module';
import { AppRootComponent } from './app-root.component';



@NgModule({
  declarations: [AppRootComponent],
  imports: [
    CommonModule,
    AppRootRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ]
})
export class AppRootModule { }
