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
  id?: string;
  data: IdeaCard;
  isReadOnly?: boolean;
  onDelete?: () => void;
  onUpdate?: (updatedData: Partial<IdeaCard>) => void;
}

export function ImageCard({ className, data, isReadOnly = true, onDelete, onUpdate, id }: ImageCardProps) {
  // const [cardImage, setCardImage] = useState<Image | null>(null);
  const readCounter = 0;
  const saveCounter = 0;

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
    <EmptyCard id={id} className={cn("w-[544px] border-2 border-black", className)}>
      {editableContent || readonlyContent}
    </EmptyCard >
  );
}
