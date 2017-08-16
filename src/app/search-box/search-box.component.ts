import { Component, OnInit } from '@angular/core';

import { QueryService } from '../query-service/query.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit {

  public inputHidden: boolean;
  public searchBoxValue: string;
  public pagesLength: number;

  constructor(private queryService: QueryService) {
    this.inputHidden = false;
    this.pagesLength = 0;
  }

  public toggleSearchInput(): boolean {
    this.inputHidden = !this.inputHidden;
    return false;
  }

  public clearOrHiddenSearchBox(): void {
    if (this.searchBoxValue === '') {
      this.hiddenSearchBox();
    } else {
      this.clearSearchBox();
    }
  }

  private hiddenSearchBox(): void {
    this.toggleSearchInput();
  }

  private clearSearchBox(): void {
    this.searchBoxValue = '';
    this.search();
  }

  public search(): void {
    this.queryService.nextSubject(this.searchBoxValue);
  }

  private observePagesLength(): void {
    this.queryService.subscribeToPagesLength(this.setPagesLength.bind(this));
  }

  private setPagesLength(length: number): void {
    this.pagesLength = length;
  }
  ngOnInit() {
    this.observePagesLength();
  }
}
