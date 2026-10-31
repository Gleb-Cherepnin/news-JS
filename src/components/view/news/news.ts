import './news.css';

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

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            const content = newsClone.querySelector<HTMLElement>('.news__description-content');
            const link = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (idx % 2) newsItem?.classList.add('alt');

            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            if (author) author.textContent = item.author || item.source.name;

            if (date) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            if (title) title.textContent = item.title;
            if (source) source.textContent = item.source.name;
            if (content) content.textContent = item.description;
            if (link) link.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
