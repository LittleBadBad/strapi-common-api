import { Media as M } from '../Media';

export interface Media {
  id: number;
  file?: { data: M };
}
