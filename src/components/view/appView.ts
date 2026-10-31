
import News from './news/news';
import Sources from './sources/sources';

interface Article {
    urlToImage: string | null;
    author: string | null;
    source: {
        name: string;
    };
    publishedAt: string;
    title: string;
    description: string | null;
    url: string;
}

interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

interface NewsResponse {
    articles?: Article[];
}

interface SourcesResponse {
    sources?: Source[];
}

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse): void {
        const values = data?.articles ?? [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse): void {
        const values = data?.sources ?? [];
        this.sources.draw(values);
    }
}

export default AppView;
