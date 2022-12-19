import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { HttpErrorStreamService } from '@services/http-error-stream/http-error-stream.service';
import { Observable } from 'rxjs';

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
  error$: Observable<HttpErrorResponse>;

  constructor(private httpErrorStreamService: HttpErrorStreamService) {}

  ngOnInit() {
    this.createMenuNavItem();
    this.initListenHttpError();
  }

  private createMenuNavItem() {
    this.menuNavItemList = appRootChildrenRoute
      .filter((el) => !!el.path)
      .filter((el) => el.path !== AppRootRouteLink.CHECKOUT);
  }

  private initListenHttpError() {
    this.error$ = this.httpErrorStreamService.onMessageEvent;
  }
}
