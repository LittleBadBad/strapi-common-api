import { Media } from '../Media';

export interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage?: { data: Media };
}
