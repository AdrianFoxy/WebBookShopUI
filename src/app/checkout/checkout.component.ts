import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  constructor(private fb: FormBuilder){

  }

  checkoutForm = this.fb.group({
    contactForm: this.fb.group({
      contactName: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactPhone: ['', Validators.required]
    }),
    deliveryForm: this.fb.group({
      deliveryMethod: ['', Validators.required],
      address: ['']
    })
  })

  ngOnInit() {
    // обновление валидации при изменении значения deliveryMethod
    const deliveryMethodControl = this.checkoutForm.get('deliveryForm.deliveryMethod');
    if (deliveryMethodControl) { // добавляем проверку на null или undefined
      deliveryMethodControl.valueChanges.subscribe(value => {
        this.updateAddressValidation(value);
      });
    }
  }


  updateAddressValidation(value: string | null) {
    const addressControl = this.checkoutForm.get('deliveryForm.address');
    if (addressControl) { // добавляем проверку на null или undefined
      if (value && value !== '1') {
        addressControl.setValidators([Validators.required]);
      } else {
        addressControl.clearValidators();
      }
      addressControl.updateValueAndValidity();
    }
  }
}
