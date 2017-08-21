import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { QueryService } from '../query-service/query.service';
import { Page } from '../page';

@Component({
  selector: '#app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss']
})

export class SearchResultListComponent implements OnInit {

  public pages: Page[];
  constructor(private queryService: QueryService) {
  }

  private observePages(): void {
    this.queryService.subscribeToPages(this.setPages.bind(this));
  }

  private setPages(pages: Page[]): void {
    this.pages = pages;
  }

  ngOnInit() {
    this.observePages();
  }

}
