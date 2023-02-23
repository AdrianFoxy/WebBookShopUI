import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingleBook } from 'src/app/shared/models/singleBook';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{

singleBook?: SingleBook;

constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
  private bcService: BreadcrumbService){}

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) this.shopService.getSingeBook(+id).subscribe({
      next: singleBook => {
        this.singleBook = singleBook;
        this.bcService.set('@bookDetails', singleBook.title)
      },
      error: error => console.log(error)
    })
  }

}
