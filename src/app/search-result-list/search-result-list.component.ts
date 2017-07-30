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
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
  providers: [
    QueryService,
    BaseUrl,
    UrlSearch
  ]
})
export class SearchResultListComponent implements OnInit {
  results: Array<any>;

  constructor(private queryService: QueryService) {
    debugger;
    this.queryService.results.subscribe(data => console.log(data));
  }

  ngOnInit() {
  }

}
