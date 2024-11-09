import { User } from "./user";
import { Book } from "./book";
import { ArticleTopic } from "./articleTopic";
import { IdeaCard } from "./ideaCard";

export interface Article {
  articleId: string;
  userId: string;
  title: string;
  miscAuthor: string | null;
  curatorNote: string;
  image: string | null;
  dateCreated: string;
  status: ArticleStatus | null;
  user: User;
  book: Book;
  articleTopics?: ArticleTopic[];
  ideaCards?: IdeaCard[];
}

export enum ArticleStatus {
  Draft,
  Pending,
  Published,
  NotApproved,
  Archived,
}
