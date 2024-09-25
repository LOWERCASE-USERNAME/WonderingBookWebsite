import { useState } from "react";
import { CommonComponentProps } from "../../../../lib/props";
import { cn } from "../../../../lib/utils";
import { IdeaCardData } from "../../../../types/IdeaCardData";
import { BlockQuote } from "../../../basic/block-quote.component";
import { EmptyCard } from "../../../basic/empty-card.component";
import { RoundedImage } from "../../../basic/rounded-image.component";
import { IdeaCardFooter } from "./idea-card-footer.component";
import { Image } from "../../../../types/Image";

interface QuoteCardProps extends CommonComponentProps {
  data: IdeaCardData;
  isReadOnly?: boolean;
  onDelete?: () => void;
  onUpdate?: (updatedData: Partial<IdeaCardData>) => void;
}

export function QuoteCard({ className, data: { id, imageSrc, text, author, readCounter, saveCounter }, isReadOnly = true, onUpdate, onDelete }: QuoteCardProps) {
  // const [cardImage, setCardImage] = useState<Image | null>(null);
  const [textCount, setTextCount] = useState<number>(text?.length ?? 0);

  if (!isReadOnly) {
    return (
      <EmptyCard className={cn("w-[544px] border-2 border-black", className)}>
        <RoundedImage src={imageSrc} isReadOnly={false}
          // setCardImage={setCardImage}
          onUpdate={onUpdate}
          id={id}
        />
        <BlockQuote text={text} author={author} onUpdate={onUpdate} isReadOnly={false} setTextCount={setTextCount} />
        <IdeaCardFooter isReadOnly={false}
          textCounter={textCount}
          handleDeleteCard={onDelete} />
      </EmptyCard>
    );
  }

  return (
    <EmptyCard className={cn("w-[544px] border-2 border-black", className)}>
      <RoundedImage src={imageSrc} isReadOnly={true} />
      <BlockQuote text={text} author={author} />
      <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
    </EmptyCard>
  );
}
