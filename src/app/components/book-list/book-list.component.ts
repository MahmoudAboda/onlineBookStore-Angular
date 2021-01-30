import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/service/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
@Component({
  selector: 'app-book-list',
  // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategory: number = 1;

  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;



  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    _config: NgbPaginationConfig) {
    _config.maxSize = 3;
    _config.boundaryLinks = true;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }




  // tslint:disable-next-line:typedef
  listBooks() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchBooks();
    }
    else {
      this.handleListBooks();
    }
  }

  handleListBooks() {

    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategory != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategory = this.currentCategoryId;


    this._bookService.getBooks(this.currentCategoryId
      , this.currentPage - 1,
      this.pageSize).subscribe(
        this.processPaginate()
      );


  }
  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._bookService.searchBooks(keyword,
      this.currentPage - 1,
      this.pageSize).subscribe(this.processPaginate()


      );
  }
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }
  processPaginate() {
    return data => {
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }



}
