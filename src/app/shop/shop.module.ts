import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { BooksItemComponent } from './books-item/books-item.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShopComponent,
    BooksItemComponent,
    FilterPipe,

  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    SharedModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
