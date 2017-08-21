import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { BaseUrl } from './base-url';
import { UrlSearch } from './url-search';
import { Page } from '../page';

@Injectable()
export class QueryService {

  public pages: Observable<Page[]>;
  private searchTerms: Subject<string>;
  private headers: Headers;

  public constructor(
    private readonly http: Http,
    private readonly baseUrl: BaseUrl,
    private readonly urlSearch: UrlSearch
  ) {
    this.searchTerms = new Subject<string>();
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    });
    this.initializesObservablePages();
  }

  public observeSearchTerms(): void {
    this.pages = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.queryWikipediaAPI(term)
        : Observable.of<Page[]>([])
      )
      .catch(error => {
        console.log(error);
        return Observable.of<Page[]>([]);
      });
  }

  private initializesObservablePages(): void {
    this.observeSearchTerms();
  }

  public subscribeToPages(callback: Function) {
    this.pages.subscribe(pages => callback(pages));
  }

  private queryWikipediaAPI(term: string): Observable<Page[]> {

    const fullUrl: string = this.getFullUrlSource(term);

    return this.http
      .get(fullUrl, { headers: this.headers })
      .map(response => {
        const pages: object = response.json().query.pages;
        const _pages: Page[] = Object.keys(pages).map(k => pages[k]).sort((a, b) => a.index - b.index);
        return _pages;
      })
      .catch(error => {
        console.log(error);
        return Observable.of<Page[]>([]);
      });
  }

  public nextSubject(searchBoxValue: string): void {
    this.searchTerms.next(searchBoxValue);
  }

  private getFullUrlSource(term: string): string {

    const baseUrl: string = this.baseUrl.getBaseUrlSource();
    const urlSearch: string = this.urlSearch.getUrlSearchSource(term);

    const fullUrl = `${baseUrl}?${urlSearch}`;

    return fullUrl;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
