import { User } from './User';
import { Post } from './Post';

export interface PostVote {
  id: number;
  attributes: {
    post?: { data: Post };
    user?: { data: User };
    agree?: boolean;
  }
}
