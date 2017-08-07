import { Component, OnInit, Input } from '@angular/core';

import { Page } from '../page';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {

  @Input() page: Page;

  constructor() { }

  ngOnInit() {
  }

}
