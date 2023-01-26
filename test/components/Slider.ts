import { Media } from '../Media';

export interface Slider {
  id: number;
  files?: { data: Media[] };
}
