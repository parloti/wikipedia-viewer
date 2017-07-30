export class UrlSearch {
    private readonly action: string;
    private readonly prop: string;
    private readonly exintro: string;
    private readonly format: string;
    private readonly origin: string;
    private titles: Array<string>;

    public constructor() {
        this.action = 'query';
        this.prop = 'extracts';
        this.exintro = 'true';
        this.format = 'json';
        this.origin = '*';
    }

    public getUrlSearchSource(_titles: Array<string>): string {
        this.titles = _titles;

        const __titles = this.getTitleSource();
        const partialSource = this.toString();

        const source = __titles + partialSource;

        return source;
    }

    private getTitleSource(): string {
        const key = 'titles';
        const value = this.titles.join('|');

        const source = `${key}=${value}`;

        return source;
    }

    private toString() {
        let source: string;

        source = '';

        Object.keys(this).forEach(key => {
            const isString = typeof this[key] === 'string';
            const value = this[key];

            if (isString) {
                source += `&${key}=${value}`;
            }
        });

        return source;
    }
}
