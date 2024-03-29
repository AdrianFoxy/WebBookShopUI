import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Delivery } from 'src/app/shared/models/delivery';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: Delivery[] = [];

  constructor(private checkoutService: CheckoutService, private basketService: BasketService) {}
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: dm => this.deliveryMethods = dm
    })
  }

  setShippingPrice(delivery: Delivery){
    this.basketService.setShippingPrice(delivery);
  }

}
