import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../shared/models/book';
import { BookSeries } from '../shared/models/bookseries';
import { Genre } from '../shared/models/genre';
import { Publisher } from '../shared/models/publisher';
import { ShopService } from './shop.service';

import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})


export class ShopComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;

  books: Book[] = [];
  publishers: Publisher[] = [];
  bookseries: BookSeries[] = [];
  genres: Genre[] = [];

  shopParams = new ShopParams();

  sortOptions = [
    {name: 'За алфавітом', value: 'name'},
    {name: 'Ціна: від низької до високої', value: 'priceAsc'},
    {name: 'Ціна: від високої до низької', value: 'priceDesc'},
  ];
  totalCount = 0;

  // Genre filter
  selectedIdGenres = new FormControl();
  searchCtrl = new FormControl();
  filteredData: ReplaySubject<Genre[]> = new ReplaySubject<Genre[]>(1);


  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getBooksInCatalog();
    this.getPublishersForFilter();
    this.getBookSeriesForFilter();
    this.getGenreForFilter();
  }

  getBooksInCatalog(){
    this.shopService.getBooks(this.shopParams).subscribe({
      next: response => {
        this.books = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      }, // what to do next
      error: error => console.log(error) // what to do if error
    })
  }

  getPublishersForFilter(){
    this.shopService.getPublishers().subscribe({
      next: response => this.publishers = [{id: 0, name:'Усі'}, ...response], // what to do next
      error: error => console.log(error) // what to do if error
    })
  }

  getBookSeriesForFilter(){
    this.shopService.getBookSeries().subscribe({
      next: response => this.bookseries = [{id: 0, name:'Усі'}, ...response], // what to do next
      error: error => console.log(error),
    })
  }

  getGenreForFilter(){
    this.shopService.getGenre().subscribe({
      next: response => this.genres = response, // what to do next
      error: error => console.log(error),
    })
  }

  // Assignment of data to be passed to books api
  onPublisherSelected(publisherId: number){
    this.shopParams.publisherId = publisherId;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onBookSeriesSelected(bookseriesId: number){
    this.shopParams.bookseriesId = bookseriesId;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  onSortSelected(event: any){
    this.shopParams.sort = event.target.value;
    this.getBooksInCatalog();
    }

  onGenresSelected(genresIds: number[]){
    this.shopParams.genreIds = this.selectedIdGenres.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  // DropDown lists for filters
  onGenreRemoved(genre: string) {
    const genresInFilter = this.selectedIdGenres.value as string[];
    this.removeFirst(genresInFilter, genre);
    this.selectedIdGenres.setValue(genresInFilter); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  idsToGenres(ids: number[]) : any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return this.genres.find((t) => t.id == id);
    });
  }

  // Pagination
  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getBooksInCatalog();
    }
  }

  // Search
  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber= 1;
    this.getBooksInCatalog();
  }

  // Reset all filters params
  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.selectedIdGenres.setValue([]);
    this.getBooksInCatalog();
  }


}
