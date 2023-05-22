import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../shared/models/user';
import { ShopParams } from '../shared/models/shopParams';
import { Pagination } from '../shared/models/pagination';
import { Book } from '../shared/models/book';


@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  baseUrl = 'https://localhost:7274/api/';

  constructor(private http: HttpClient) { }

  getAllUsers(UserParams: ShopParams) {
    let params = new HttpParams();

    if (UserParams.pageNumber)
      params = params.append('pageIndex', UserParams.pageNumber.toString());

    if (UserParams.pageSize)
      params = params.append('pageSize', UserParams.pageSize.toString());

    return this.http.get<Pagination<User[]>>(this.baseUrl + 'Account/get-all-users', { params });
  }

  getRecommedationsByOrders(UserParams: ShopParams, userId: string){
    let params = new HttpParams();

    if (UserParams.pageNumber)
      params = params.append('pageIndex', UserParams.pageNumber.toString());

    if (UserParams.pageSize)
      // kostil for diplom  params = params.append('pageSize', UserParams.pageSize.toString());
      params = params.append('pageSize', '3');

    if(userId)
      params = params.append('userId', userId);

    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'Book/get-recommedations-by-orders-with-pag', {params});
  }


}
