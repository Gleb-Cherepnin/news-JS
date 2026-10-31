import News from './news/news';
import Sources from './sources/sources';
import { ArticleResponse, SourceResponse } from '../../types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ArticleResponse): void {
        this.news.draw(data.articles ?? []);
    }

    drawSources(data: SourceResponse): void {
        this.sources.draw(data.sources ?? []);
    }
}

export default AppView;
