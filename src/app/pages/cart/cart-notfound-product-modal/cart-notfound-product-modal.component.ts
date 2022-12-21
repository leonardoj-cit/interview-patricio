import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cart-notfound-product-modal',
  templateUrl: './cart-notfound-product-modal.component.html',
  styleUrls: ['./cart-notfound-product-modal.component.scss'],
})
export class CartNotfoundProductModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {}
}
