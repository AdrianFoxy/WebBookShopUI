import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CoreModule } from '../core/core.module';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminRecommedantionsComponent } from './admin-recommedantions/admin-recommedantions.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';



@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminOrdersComponent,
    AdminRecommedantionsComponent,
    AdminBooksComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    CoreModule
  ]
})
export class AdminPanelModule { }
