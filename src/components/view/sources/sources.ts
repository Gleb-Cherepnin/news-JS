
import './sources.css';

interface Source {
    id: string;
    name: string;
}

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) return;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');

            if (name) name.textContent = item.name;
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
