import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { QueryService } from '../query-service/query.service';
import { BaseUrl } from '../query-service/base-url';
import { UrlSearch } from '../query-service/url-search';
import { Result } from '../result';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  providers: [
    QueryService,
    BaseUrl,
    UrlSearch
  ]
})

export class SearchBoxComponent implements OnInit {

  constructor(private queryService: QueryService) { }

  public search(searchBoxValue: string): void {
    this.queryService.searchTerms.next(searchBoxValue);
  }

  ngOnInit() {
    this.queryService.observeSearchBoxValue();
  }
}
