import {Category} from './Category';
import {Author} from './Author';
import {Media} from './Media';
import {Media as M} from "./components/Media"
import {Quote} from "./components/Quote";
import {RichText} from "./components/RichText";
import {Slider} from "./components/Slider";

export interface Article {
    id: number;
    attributes: {
        title?: string;
        description?: string;
        slug?: string;
        cover?: { data: Media };
        author?: { data: Author };
        category?: { data: Category };
        blocks?: { data: (M | Quote | RichText | Slider)[] }
    }
}
