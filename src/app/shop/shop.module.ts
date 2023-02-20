import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { BooksItemComponent } from './books-item/books-item.component';



@NgModule({
  declarations: [
    ShopComponent,
    BooksItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
