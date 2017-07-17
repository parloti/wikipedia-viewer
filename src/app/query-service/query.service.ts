import { Injectable } from '@angular/core';

import { Url } from './url';

@Injectable()
export class QueryService {
  private readonly url: Url;

  public constructor() {
    this.url = new Url(['Terra', 'Marte', 'Vênus']);
  }

  query(): void {
    console.log(this.url.getUrlSource());
  }

}
