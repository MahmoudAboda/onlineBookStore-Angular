import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { BookCategory } from 'src/app/common/book-category';

@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.scss']
})
export class BookCategoryComponent implements OnInit {

  bookService: BookService[];
  bookCategories: BookCategory[];
  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this.listBookCategories();
  }
  listBookCategories() {
    this._bookService.getBookCategory().subscribe(
      data => this.bookCategories = data


    )
  }

}
