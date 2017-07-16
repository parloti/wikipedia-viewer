import { Injectable } from '@angular/core';

import { Url } from './url';
import { UrlSearch } from './url-search';

@Injectable()
export class QueryService {
  private url = new Url();
  private search = new UrlSearch(['']);
  query(): void {
    console.log(this.url.getUrlSource());
  }

}
