export type IdeaCardData = {
  id: string;
  title?: string;
  imageSrc?: string;
  author?: string;
  text?: string;
  readCounter?: number;
  saveCounter?: number;
  type?: "text" | "image" | "quote";
};
