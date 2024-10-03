import { CommonComponentProps } from "../../../../lib/props";
import { IdeaCardData } from "../../../../types/IdeaCardData";
import { EmptyCard } from "../../../basic/empty-card.component";
import { IdeaCardFooter } from "./idea-card-footer.component";
import { UpperRoundedLargeImage } from "../../../basic/upper-rounded-large-image.component";
import { cn } from "../../../../lib/utils";
import { useState } from "react";
import { Image } from "../../../../types/Image";
import { IdeaCard } from "../../../../types/ideaCard";

interface ImageCardProps extends CommonComponentProps {
  data: IdeaCard;
  isReadOnly?: boolean;
  onDelete?: () => void;
  onUpdate?: (updatedData: Partial<IdeaCard>) => void;
}

export function ImageCard({ className, data, isReadOnly = true, onDelete, onUpdate }: ImageCardProps) {
  // const [cardImage, setCardImage] = useState<Image | null>(null);

  const editableContent = !isReadOnly && (
    <>
      <UpperRoundedLargeImage src={data.image ?? ""}
        isReadOnly={false}
        // setCardImage={setCardImage}
        isUnrestricted={true}
        onUpdate={onUpdate}
        id={data.ideaCardId}
      />
      <input className="w-full px-2 text-2xl font-bold text-left outline-none" placeholder="Tiêu đề"
        value={data.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate && onUpdate({ title: e.target.value ?? "" })} />
      <IdeaCardFooter isReadOnly={false}
        handleDeleteCard={onDelete} />
    </>
  );

  const readonlyContent = isReadOnly && (
    <>
      <UpperRoundedLargeImage src={data.image ?? ""} className="h-fit" isUnrestricted={true} />
      <span className="w-full text-2xl font-bold text-left">{data.title}</span>
      <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
    </>
  )

  return (
    <EmptyCard className={cn("w-[544px] border-2 border-black", className)}>
      {editableContent || readonlyContent}
    </EmptyCard >
  );
}
