import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookSeries } from '../shared/models/bookseries';
import { Publisher } from '../shared/models/publisher';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  books: Book[] = [];
  publishers: Publisher[] = [];
  bookseries: BookSeries[] = [];
  publisherIdSelected = 0;
  bookseriesIdSelected = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getBooksInCatalog();
    this.getPublishers();
    this.getBookSeries();
  }

  getBooksInCatalog(){
    this.shopService.getBooks(this.publisherIdSelected, this.bookseriesIdSelected).subscribe({
      next: response => this.books = response.data, // what to do next
      error: error => console.log(error) // what to do if error
    })
  }

  getPublishers(){
    this.shopService.getPublishers().subscribe({
      next: response => this.publishers = [{id: 0, name:'Усі'}, ...response], // what to do next
      error: error => console.log(error) // what to do if error
    })
  }

  getBookSeries(){
    this.shopService.getBookSeries().subscribe({
      next: response => this.bookseries = [{id: 0, name:'Усі'}, ...response], // what to do next
      error: error => console.log(error),
    })
  }

  onPublisherSelected(publisherId: number){
    this.publisherIdSelected = publisherId;
    this.getBooksInCatalog();
  }

  onBookSeriesSelected(bookseriesId: number){
    this.bookseriesIdSelected = bookseriesId;
    this.getBooksInCatalog();
  }

}
