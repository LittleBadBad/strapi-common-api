import { Article } from './Article';
import { Media } from './Media';

export interface Author {
  id: number;
  attributes: {
    name?: string;
    avatar?: { data: Media };
    email?: string;
    articles: { data: Article[] };
  }
}
