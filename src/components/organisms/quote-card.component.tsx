import { CommonComponentProps } from "../../lib/props";
import { IdeaCardData } from "../../types/IdeaCardData";
import { BlockQuote } from "../atoms/block-quote.component";
import { EmptyCard } from "../atoms/empty-card.component";
import { RoundedImage } from "../atoms/rounded-image.component";
import { IdeaCardFooter } from "../molecules/idea-card-footer.component";

interface QuoteCardProps extends CommonComponentProps {
  data: IdeaCardData;
}

export function QuoteCard({ children, className, data: { imageSrc, text, author, readCounter, saveCounter } }: QuoteCardProps) {
  return (
    <>
      <EmptyCard className={className}>
        <RoundedImage src={imageSrc} />
        <BlockQuote text={text} author={author} />
        <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
      </EmptyCard>
      {children}
    </>

  );
}
