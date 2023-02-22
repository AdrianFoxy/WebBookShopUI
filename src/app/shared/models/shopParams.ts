export class ShopParams{
  // publisherId?: number, bookseriesId?: number, genreIds?: number[], sort?: string
  publisherId = 0;
  bookseriesId = 0;
  genreIds: number[] = [];
  sort = 'name';
  pageNumber = 1;
  pageSize = 6;
  search ='';
}
