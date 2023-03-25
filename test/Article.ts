import {Category} from './Category';
import {Author} from './Author';
import {Media} from './Media';

export interface Article {
    id: number;
    attributes: {
        title?: string;
        description?: string;
        slug?: string;
        cover?: { data: Media };
        author?: { data: Author };
        category?: { data: Category };
    }
}
