import { Post } from './Post';
import { User } from './User';

export interface Collect {
  id: number;
  attributes: {
    category?: string;
    private: boolean;
    user?: { data: User };
    posts: { data: Post[] };
  }
}
