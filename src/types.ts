export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourceResponse {
    sources: Source[];
}

export interface ArticleResponse {
    articles: Article[];
}

export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RequestValue = string | number;

export interface RequestOptions {
    [key: string]: RequestValue;
}

export interface ResponseOptions {
    endpoint: ApiEndpoint;
    options?: RequestOptions;
}

export type SourceSummary = Pick<Source, 'id' | 'name'>;
export type ReadonlySource = Readonly<Source>;
