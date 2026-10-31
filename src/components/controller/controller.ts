import AppLoader from './appLoader';
import { ApiEndpoint, ArticleResponse, SourceResponse } from '../../types';

class AppController extends AppLoader {
    getSources(callback: (data: SourceResponse) => void): void {
        super.getResp<SourceResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: ArticleResponse) => void): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');

                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    super.getResp<ArticleResponse>(
                        {
                            endpoint: ApiEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }

                return;
            }

            target = target.parentElement;
        }
    }
}

export default AppController;
