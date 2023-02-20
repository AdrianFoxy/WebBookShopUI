import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './models/book';
import { Pagination } from './models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'BookShop';
  books: Book[] = [];

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.http.get<Pagination<Book[]>>('https://localhost:7274/api/Book/catalog_books?PageSize=50').subscribe({
      next: response => this.books = response.data, // what to do next
      error: error => console.log(error), // what to do if error
      complete: () => {
        console.log('request completed');
        console.log('extra statment');
      }
    })
  }
}
