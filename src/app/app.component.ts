import { Component } from '@angular/core';

import { QueryService } from './query-service/query.service';
import { BaseUrl } from './query-service/base-url';
import { UrlSearch } from './query-service/url-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    QueryService,
    BaseUrl,
    UrlSearch
  ]
})

export class AppComponent {
}
