import { CommentVote } from './CommentVote';
import { User } from './User';
import { Post } from './Post';

export interface Comment {
  id: number;
  attributes: {
    post?: { data: Post };
    content?: string;
    user?: { data: User };
    reply_to?: { data: Comment };
    comments: { data: Comment[] };
    comment_votes: { data: CommentVote[] };
    removed?: boolean;
    locale: string;
    localizations?: { data: Comment[] }
  }
}
