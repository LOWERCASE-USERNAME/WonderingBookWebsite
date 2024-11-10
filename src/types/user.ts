import { Article } from "./article";
import { Wallet } from "./wallet";

export interface User {
  id: string;
  userName: string;
  email: string;
  fullname: string;
  createdAt: string;
  modifiedAt: string;
  lastActiveAt: string;
  isAdmin: boolean;
  articles: Article[];
  status: UserStatus | null;
  wallet: Wallet | null;
}

export enum UserStatus {
  Active,
  Banned,
}
