export class UrlSearch {
    private action: string;
    private prop: string;
    private exintro: string;
    private format: string;
    private titles: Array<string>;

    private href: string;

    constructor(_titles: Array<string>) {
        this.action = 'query';
        this.prop = 'extracts';
        this.exintro = 'true';
        this.format = 'json';
        this.titles = _titles;
    }

    public getUrlSearchSource(): string {
        const _titles = this.getTitleSource();
        const partialSource = this.toString();

        const source = _titles + partialSource;

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
