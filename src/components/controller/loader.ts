import { RequestOptions, ResponseOptions, HttpMethod } from '../../types';

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: ResponseOptions,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw new Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const url = new URL(`${this.baseLink}${endpoint}`);

        Object.entries(urlOptions).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });

        return url.toString();
    }

    load<T>(method: HttpMethod, endpoint: string, callback: (data: T) => void, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
