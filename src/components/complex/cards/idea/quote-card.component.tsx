import { useState } from "react";
import { CommonComponentProps } from "../../../../lib/props";
import { cn } from "../../../../lib/utils";
import { IdeaCardData } from "../../../../types/IdeaCardData";
import { BlockQuote } from "../../../basic/block-quote.component";
import { EmptyCard } from "../../../basic/empty-card.component";
import { RoundedImage } from "../../../basic/rounded-image.component";
import { IdeaCardFooter } from "./idea-card-footer.component";
import { Image } from "../../../../types/Image";
import { IdeaCard } from "../../../../types/ideaCard";

interface QuoteCardProps extends CommonComponentProps {
  data: IdeaCard;
  isReadOnly?: boolean;
  onDelete?: () => void;
  onUpdate?: (updatedData: Partial<IdeaCard>) => void;
}

export function QuoteCard({ className, data, isReadOnly = true, onUpdate, onDelete }: QuoteCardProps) {
  // const [cardImage, setCardImage] = useState<Image | null>(null);
  const [textCount, setTextCount] = useState<number>(data.content?.length ?? 0);

  const editableContent = !isReadOnly && (
    <>
      <RoundedImage src={data.image ?? ""} isReadOnly={false}
        // setCardImage={setCardImage}
        onUpdate={onUpdate}
        id={data.ideaCardId}
      />
      <BlockQuote text={data.content} author={"Me"} onUpdate={onUpdate} isReadOnly={false} setTextCount={setTextCount} />
      <IdeaCardFooter isReadOnly={false}
        textCounter={textCount}
        handleDeleteCard={onDelete} />
    </>
  );

  const readonlyContent = isReadOnly && (
    <>
      <RoundedImage src={data.image ?? ""} isReadOnly={true} />
      <BlockQuote text={data.content} author={"Me"} />
      <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
    </>
  )

  return (
    <EmptyCard className={cn("w-[544px] border-2 border-black", className)}>
      {editableContent || readonlyContent}
    </EmptyCard>
  );
}
