import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { SearchResultListComponent } from './search-result-list/search-result-list.component';
import { InputSearchComponent } from './search-box/input-search/input-search.component';
import { IconSearchComponent } from './search-box/icon-search/icon-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    SearchResultItemComponent,
    SearchResultListComponent,
    InputSearchComponent,
    IconSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
