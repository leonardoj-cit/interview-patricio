import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { appRootChildrenRoute } from './app-root-child-route';
import { AppRootRouteLink } from './shared/enums/app-root-route-link.enum';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppRootComponent implements OnInit {
  AppRootRouteLink = AppRootRouteLink;
  menuNavItemList!: Routes;
  constructor(private router: Router) {}

  ngOnInit() {
    this.createMenuNavItem();
  }

  createMenuNavItem() {
    this.menuNavItemList = appRootChildrenRoute.filter((el) => !!el.path);
  }
}
