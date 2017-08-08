import { UrlSearch } from './url-search';

export class BaseUrl {

    private readonly protocol: string;
    private readonly host: string;
    private readonly pathname: string;

    public constructor() {
        this.protocol = 'https:';
        this.host = 'en.wikipedia.org';
        this.pathname = '/w/api.php';
    }

    public getBaseUrlSource(): string {
        return `${this.protocol}//${this.host}${this.pathname}`;
    }

}
