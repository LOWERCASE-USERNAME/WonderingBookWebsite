import { ArticleTopic } from "./articleTopic";

export interface Topic {
  topicId: number;
  topicName: string;
  articleTopics: ArticleTopic[];
}
