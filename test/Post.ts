import { PostLike } from './PostLike';
import { Tag } from './Tag';
import { PostVote } from './PostVote';
import { Comment } from './Comment';
import { User } from './User';

export interface Post {
  id: number;
  attributes: {
    content?: string;
    title?: string;
    user?: { data: User };
    comments: { data: Comment[] };
    post_votes: { data: PostVote[] };
    tags: { data: Tag[] };
    post_likes: { data: PostLike[] };
    locale: string;
    localizations?: { data: Post[] }
  }
}
