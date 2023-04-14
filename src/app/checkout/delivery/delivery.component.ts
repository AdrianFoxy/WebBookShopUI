import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Delivery } from 'src/app/shared/models/delivery';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;
  deliveryMethods: Delivery[] = [];

  constructor(private checkoutService: CheckoutService) {}
  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: dm => this.deliveryMethods = dm
    })
  }

}
