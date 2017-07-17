import { UrlSearch } from './url-search';

export class Url {
    private readonly protocol: string;
    private readonly host: string;
    private readonly pathname: string;
    private search: UrlSearch;

    public constructor(_title: Array<string>) {
        this.protocol = 'https:';
        this.host = 'en.wikipedia.org';
        this.pathname = '/w/api.php';
        this.search = new UrlSearch(_title);
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
