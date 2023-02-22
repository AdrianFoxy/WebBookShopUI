import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookSeries } from '../shared/models/bookseries';
import { Genre } from '../shared/models/genre';
import { Pagination } from '../shared/models/pagination';
import { Publisher } from '../shared/models/publisher';
import { ShopParams } from '../shared/models/shopParams';
import { SingleBook } from '../shared/models/singleBook';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7274/api/';
  filteredGenres: any;


  constructor(private http: HttpClient) { }

  getBooks(ShopParams: ShopParams){
    let params = new HttpParams();

    if(ShopParams.sort) params = params.append('PageIndex', ShopParams.pageNumber);
    if(ShopParams.sort) params = params.append('pageSize', ShopParams.pageSize);
    if(ShopParams.publisherId > 0) params = params.append('PublisherId', ShopParams.publisherId);
    if(ShopParams.bookseriesId > 0) params = params.append('BookseriesId', ShopParams.bookseriesId);
    if(ShopParams.genreIds && ShopParams.genreIds.length > 0){
      for(let i = 0; i < ShopParams.genreIds.length; i++){
        params = params.append('GenreIds', ShopParams.genreIds[i].toString());
      }
    }
    if(ShopParams.sort) params = params.append('Sort', ShopParams.sort);
    if(ShopParams.search) params = params.append('Search', ShopParams.search);

    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'Book/catalog_books', {params});
  }

  getSingeBook(id: number){
    return this.http.get<SingleBook>(this.baseUrl + 'Book/' + id);
  }

  getPublishers(){
    return this.http.get<Publisher[]>(this.baseUrl + 'Publisher/get-all-publishers');
  }

  getBookSeries(){
    return this.http.get<BookSeries[]>(this.baseUrl + 'BookSeries/get-all-book-series')
  }

  getGenre(){
    return this.http.get<Genre[]>(this.baseUrl + 'Genre/all-genres')
  }
}
