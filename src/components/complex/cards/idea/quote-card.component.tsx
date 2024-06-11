import { CommonComponentProps } from "../../../../lib/props";
import { cn } from "../../../../lib/utils";
import { IdeaCardData } from "../../../../types/IdeaCardData";
import { BlockQuote } from "../../../basic/block-quote.component";
import { EmptyCard } from "../../../basic/empty-card.component";
import { RoundedImage } from "../../../basic/rounded-image.component";
import { IdeaCardFooter } from "./idea-card-footer.component";

interface QuoteCardProps extends CommonComponentProps {
  data: IdeaCardData;
}

export function QuoteCard({ children, className, data: { imageSrc, text, author, readCounter, saveCounter } }: QuoteCardProps) {
  return (
    <>
      <EmptyCard className={cn("w-[544px]", className)}>
        <RoundedImage src={imageSrc} />
        <BlockQuote text={text} author={author} />
        <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
      </EmptyCard>
      {children}
    </>

  );
}
