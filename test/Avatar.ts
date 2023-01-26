import { User } from './User';
import { Media } from './Media';

export interface Avatar {
  id: number;
  attributes: {
    img?: { data: Media };
    user?: { data: User };
  }
}
