import { Article } from "./article";
import { Topic } from "./topic";

export interface ArticleTopic {
  articleTopicId: string;
  articleId: string;
  topicId: number;
  article: Article;
  topic: Topic;
}
