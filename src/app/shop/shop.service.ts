import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookSeries } from '../shared/models/bookseries';
import { Pagination } from '../shared/models/pagination';
import { Publisher } from '../shared/models/publisher';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7274/api/';


  constructor(private http: HttpClient) { }

  getBooks(publisherId?: number, bookseriesId?: number){
    let params = new HttpParams();

    if(publisherId) params = params.append('PublisherId', publisherId);
    if(bookseriesId) params = params.append('BookseriesId', bookseriesId);

    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'Book/catalog_books', {params});
  }

  getPublishers(){
    return this.http.get<Publisher[]>(this.baseUrl + 'Publisher/get-all-publishers');
  }

  getBookSeries(){
    return this.http.get<BookSeries[]>(this.baseUrl + 'BookSeries/get-all-book-series')
  }
}
