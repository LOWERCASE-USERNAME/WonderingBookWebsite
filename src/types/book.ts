import { Article } from "./article";

export interface Book {
  id: string;
  title: string;
  authors: string;
  publisher: string | null;
  publishedDate: string | null;
  description: string | null;
  iSBN: string | null;
  pageCount: number | null;
  imageLink: string | null;
  articles: Article[];
}
