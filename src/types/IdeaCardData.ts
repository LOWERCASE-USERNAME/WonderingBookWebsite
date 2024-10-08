export type IdeaCardData = {
  id: string;
  order: number; // TODO: implement this
  title?: string;
  imageSrc?: string;
  author?: string;
  text?: string;
  readCounter?: number;
  saveCounter?: number;
  type?: "text" | "image" | "quote";
};
