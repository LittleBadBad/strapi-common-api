import { Seo } from './components/Seo';
import { Media } from './Media';

export interface Global {
  id: number;
  attributes: {
    siteName: string;
    favicon?: { data: Media };
    siteDescription: string;
    defaultSeo?: Seo;
  }
}
