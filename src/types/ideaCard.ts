import { IdeaCardType } from "./ideaCardType";
import { Article } from "./article";
import { Blob } from "buffer";

export interface IdeaCard {
  ideaCardId: string;
  articleId: string;
  cardType: IdeaCardType;
  title: string;
  content: string;
  image: string | null;
  order: number | null;
  article?: Article;
}
