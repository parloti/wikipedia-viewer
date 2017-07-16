import { UrlSearch } from './url-search';

export class Url {
    private protocol: string;
    private host: string;
    private pathname: string;
    private search: UrlSearch;

    constructor() {
        this.protocol = 'https:';
        this.host = 'en.wikipedia.org';
        this.pathname = '/w/api.php';
        this.search = new UrlSearch(['rr', 'ss', 'ddd']);
    }

    public getUrlSource(): string {
        const baseUrl = this.getBaseUrl();
        const searchSource = this.search.getUrlSearchSource();

        const source = `${baseUrl}?${searchSource}`;

        return source;
    }

    private getBaseUrl(): string {
        return `${this.protocol}//${this.host}${this.pathname}`;
    }
}
