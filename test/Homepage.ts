import { Article } from './Article';

export interface Homepage {
  id: number;
  attributes: {
    hero?: { data: Article };
  }
}
