import { Component, OnInit } from '@angular/core';

import { QueryService } from '../query-service/query.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  providers: [QueryService]
})
export class SearchBoxComponent implements OnInit {

  constructor(private queryService: QueryService) { }

  ngOnInit() {
    this.queryService.query();
  }

}
