import { Article } from './Article';

export interface Category {
  id: number;
  attributes: {
    name?: string;
    slug?: string;
    articles: { data: Article[] };
    description?: string;
  }
}
