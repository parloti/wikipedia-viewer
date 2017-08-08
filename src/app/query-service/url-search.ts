export class UrlSearch {

    private readonly action: string;
    private readonly errorformat: string;
    private readonly errorlang: string;
    private readonly exintro: number;
    private readonly format: string;
    private readonly generator: string;
    private readonly gsrinfo: string;
    private gsroffset: number;
    private gsrsearch: string;
    private readonly origin: string;
    private readonly piprop: string;
    private readonly prop: string;
    private readonly rawcontinue: number;
    private readonly responselanginfo: number;
    private readonly uselang: string;
    private readonly utf8: number;

    public constructor() {
        this.action = 'query';
        this.errorformat = 'raw';
        this.errorlang = 'en';
        this.exintro = 1;
        this.format = 'json';
        this.generator = 'search';
        this.gsrinfo = 'totalhits';
        this.gsroffset = 0;
        this.gsrsearch = '';
        this.origin = '*';
        this.piprop = 'thumbnail|name';
        this.prop = 'extracts|pageimages';
        this.rawcontinue = 1;
        this.responselanginfo = 1;
        this.uselang = 'en';
        this.utf8 = 1;
    }

    public getUrlSearchSource(term: string, offset: number = 0): string {
        this.gsrsearch = term;
        this.gsroffset = offset;

        const source = this.toString();

        return source;
    }

    private toString() {
        let source: string;

        source = '';

        Object.keys(this).forEach(key => {
            const value = this[key];
            source += `&${key}=${value}`;
        });

        return source;
    }
}
