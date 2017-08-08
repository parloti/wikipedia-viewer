import { Component, OnInit } from '@angular/core';

import { QueryService } from '../query-service/query.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit {

  constructor(private queryService: QueryService) { }

  public search(searchBoxValue: string): void {
    this.queryService.nextSubject(searchBoxValue);
  }

  ngOnInit() {
    this.queryService.observeSearchTerms();
  }
}
