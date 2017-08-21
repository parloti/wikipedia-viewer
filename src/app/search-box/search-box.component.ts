import { Component, HostListener, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { QueryService } from './../query-service/query.service';
import { Page } from '../page';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit {

  public pagesLength: number;
  public isInputSearchHidden: boolean;
  public searchBoxValue: string;

  constructor(
    private queryService: QueryService
  ) {
    this.pagesLength = 0;
    this.isInputSearchHidden = true;
  }

  @HostListener('window:keyup.enter', ['$event'])
  private onEnterKeyUp($event): void {
    this.focusOnInputSearch();
  }

  private focusOnInputSearch(): void {
    if (this.isInputSearchHidden) {
      this.toggleSearchInput();
    }
  }

  public toggleSearchInput(): boolean {
    this.isInputSearchHidden = !this.isInputSearchHidden;
    return false;
  }

  private observePagesLength(): void {
    this.queryService.subscribeToPages(this.setPagesLength.bind(this));
  }

  private setPagesLength(pages: Page[]): void {
    this.pagesLength = pages.length;
  }

  public ngOnInit(): void {
    this.observePagesLength();
  }
}
