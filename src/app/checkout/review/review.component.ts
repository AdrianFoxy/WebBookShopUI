import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { OrderToCreate } from 'src/app/shared/models/order';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService
  ) { }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) return console.log("Помилка з кошиком");

    const orderToCreate = this.getOrderToCreate(basket);
    if (!orderToCreate) return console.log("Помилка при створені замовлення");

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: (order) => {
        this.toastr.success('Order Created');
        console.log(order);
      }
    });
  }

  private getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryId = this.checkoutForm?.get('deliveryForm.deliveryMethod')?.value;
    const address = this.checkoutForm?.get('deliveryForm.address')?.value;
    const contactName = this.checkoutForm?.get('contactForm.contactName')?.value;
    const contactEmail = this.checkoutForm?.get('contactForm.contactEmail')?.value;
    const contactPhone = this.checkoutForm?.get('contactForm.contactPhone')?.value;

    if (!deliveryId || !address || !contactEmail || !contactName || !contactPhone) {
      throw new Error(`One or more fields in the checkout form are missing or invalid: deliveryId=${deliveryId}, address=${address}, contactEmail=${contactEmail}, contactName=${contactName}, contactPhone=${contactPhone}`);
    }

    return {
      basketId: basket.id,
      deviveryId: deliveryId,
      address: address,
      contactEmail: contactEmail,
      contactName: contactName,
      contactPhone: contactPhone
    };
  }
}
