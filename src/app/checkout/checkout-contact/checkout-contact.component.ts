import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-contact',
  templateUrl: './checkout-contact.component.html',
  styleUrls: ['./checkout-contact.component.scss']
})
export class CheckoutContactComponent {
  @Input() checkoutForm?: FormGroup;
}
