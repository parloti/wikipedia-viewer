import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';

import { BaseUrl } from './base-url';
import { UrlSearch } from './url-search';
import { Result } from '../result';

@Injectable()
export class QueryService {

  public searchTerms: Subject<string>;
  public results: Observable<Result[]>;
  private headers: Headers;

  public constructor(
    private readonly http: Http,
    private readonly baseUrl: BaseUrl,
    private readonly urlSearch: UrlSearch
  ) {
    this.searchTerms = new Subject<string>();
    this.results = new Observable<Result[]>();
    this.headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8'
    });
  }

  publishData(data: string) {
    //this.searchTerms.next(data);
  }

  public query(searchBoxValue: string): Observable<Result[]> {
    console.log(searchBoxValue);
    //this.searchTerms.next(searchBoxValue);

    const titles: Array<string> = this.getTitles(searchBoxValue);
    const fullUrl: string = this.getFullUrlSource(titles);
    console.log(fullUrl);

    return this.http
      .get(fullUrl)
      .map(response => {
        console.log(response);
        return response.json().data as Result[];
      })
      .catch(error => {
        console.log(error);
        return Observable.of<Result[]>([]);
      });
  }

  public observeSearchBoxValue(): void {
    this.results = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.query(term)
        : Observable.of<Result[]>([])
      )
      .catch(error => {
        console.log(error);
        return Observable.of<Result[]>([]);
      });
  }

  private getFullUrlSource(titles: Array<string>): string {
    const baseUrl: string = this.baseUrl.getBaseUrlSource();
    const searchSource: string = this.urlSearch.getUrlSearchSource(titles);

    const fullUrl = `${baseUrl}?${searchSource}`;

    return fullUrl;
  }

  private getTitles(searchBoxValue: string): Array<string> {
    const titles = searchBoxValue.split(/,|\||;/g);
    const _titles = titles.map(value => value.trim());

    return _titles;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
