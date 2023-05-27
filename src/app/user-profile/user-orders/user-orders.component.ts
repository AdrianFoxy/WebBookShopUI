import { Component } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {

  orders: Order[] = [];
  orderTotalCount = 0;

  userParam = new ShopParams();

  constructor(private userProfieleService: UserProfileService) {
  }

  ngOnInit() {
    this.getOrderForCurrentUser();
  }

  getOrderForCurrentUser(){
    this.userProfieleService.getOrdersForCurrentUser(this.userParam).subscribe({
      next: response => {
        this.orders = response.data;
        this.userParam.pageNumber = response.pageIndex;
        this.userParam.pageSize = response.pageSize;
        this.orderTotalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

}
