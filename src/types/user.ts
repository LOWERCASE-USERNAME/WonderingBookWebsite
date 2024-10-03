import { Article } from "./article";

export interface User {
  id: string;
  fullname: string;
  createdAt: string;
  modifiedAt: string;
  lastActiveAt: string;
  isAdmin: boolean;
  articles: Article[];
}
