import { User } from './User';
import { Post } from './Post';

export interface PostLike {
  id: number;
  attributes: {
    post?: { data: Post };
    user?: { data: User };
  }
}
