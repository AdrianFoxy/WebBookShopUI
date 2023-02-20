import { Component, Input } from '@angular/core';
import { Book } from 'src/app/shared/models/book';

@Component({
  selector: 'app-books-item',
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.scss']
})
export class BooksItemComponent {
  @Input() book?: Book;
}
