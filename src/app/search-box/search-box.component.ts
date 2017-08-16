import { Component } from '@angular/core';

import { QueryService } from '../query-service/query.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent {

  public inputHidden: boolean;
  public searchBoxValue: string;

  constructor(private queryService: QueryService) {
    this.inputHidden = false;
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
    this.queryService.clearPages();
  }

  public search(): void {
    this.queryService.nextSubject(this.searchBoxValue);
  }
}
