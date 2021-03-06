import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon-search',
  templateUrl: './icon-search.component.html',
  styleUrls: ['./icon-search.component.scss']
})
export class IconSearchComponent {

  @Output()
  public readonly onToggleSearchInput: EventEmitter<boolean>;
  private readonly eventEmiterIsAsync: boolean;

  constructor() {
    this.eventEmiterIsAsync = true;
    this.onToggleSearchInput = new EventEmitter<boolean>(this.eventEmiterIsAsync);
  }

  public toggleSearchInput(): boolean {
    this.onToggleSearchInput.emit();
    return false;
  }

}
