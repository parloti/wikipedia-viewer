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

  public searchTerms: Subject<string>;
  public pages: Observable<Page[]>;
  private headers: Headers;

  public constructor(
    private readonly http: Http,
    private readonly baseUrl: BaseUrl,
    private readonly urlSearch: UrlSearch
  ) {
    this.searchTerms = new Subject<string>();
    this.pages = new Observable<Page[]>();
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  public nextSubject(searchBoxValue: string) {
    this.searchTerms.next(searchBoxValue);
  }

  public query(searchBoxValue: string): Observable<Page[]> {
    console.log(searchBoxValue);
    //this.searchTerms.next(searchBoxValue);

    const titles: Array<string> = this.getTitles(searchBoxValue);
    const fullUrl: string = this.getFullUrlSource(titles);
    console.log(fullUrl);

    return this.http
      .get(fullUrl)
      .map(response => {
        console.log(response);
        const pages = response.json().query.pages;
        return Object.keys(pages).map(k => pages[k]) as Page[];
      })
      .catch(error => {
        console.log(error);
        return Observable.of<Page[]>([]);
      });
  }

  public observeSearchBoxValue(): void {
    this.pages = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => {
        console.log(term);
        return term
          ? this.query(term)
          : Observable.of<Page[]>([]);
      }
      )
      .catch(error => {
        console.log(error);
        return Observable.of<Page[]>([]);
      });
  }

  public getFullUrlSource(titles: Array<string>): string {
    const baseUrl: string = this.baseUrl.getBaseUrlSource();
    const searchSource: string = this.urlSearch.getUrlSearchSource(titles);

    const fullUrl = `${baseUrl}?${searchSource}`;

    return fullUrl;
  }

  public getTitles(searchBoxValue: string): Array<string> {
    const titles = searchBoxValue.split(/,|\||;/g);
    const _titles = titles.map(value => value.trim());

    return _titles;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
