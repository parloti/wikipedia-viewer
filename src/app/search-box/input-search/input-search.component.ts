import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { QueryService } from './../../query-service/query.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Output()
  public readonly onToggleSearchInput: EventEmitter<boolean>;
  private readonly eventEmiterIsAsync: boolean;

  public inputSearchValue: string;

  constructor(
    private queryService: QueryService
  ) {
    this.eventEmiterIsAsync = true;
    this.onToggleSearchInput = new EventEmitter<boolean>(this.eventEmiterIsAsync);
  }

  public search(): void {
    this.queryService.nextSubject(this.inputSearchValue);
  }

  public clearOrHiddenInputSearch(): void {
    if (typeof this.inputSearchValue === 'undefined' || this.inputSearchValue === '') {
      this.hiddenSearchBox();
    } else {
      this.clearSearchBox();
    }
  }

  private hiddenSearchBox(): void {
    this.toggleSearchInput();
  }

  private toggleSearchInput(): boolean {
    this.onToggleSearchInput.emit();
    return false;
  }

  private clearSearchBox(): void {
    this.inputSearchValue = '';
    this.search();
  }

  ngOnInit() {
    this.inputSearchValue = 'Marte';
    this.search();
  }

}
