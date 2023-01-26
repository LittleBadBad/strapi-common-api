import { User } from './User';
import { Comment } from './Comment';

export interface CommentVote {
  id: number;
  attributes: {
    comment?: { data: Comment };
    user?: { data: User };
  }
}
