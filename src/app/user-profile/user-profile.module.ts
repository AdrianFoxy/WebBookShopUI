import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { UserChoosenbooksComponent } from './user-choosenbooks/user-choosenbooks.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserOrdersComponent,
    UserReviewsComponent,
    UserChoosenbooksComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
