import { CommonComponentProps } from "../../../../lib/props";
import { IdeaCardData } from "../../../../types/IdeaCardData";
import { EmptyCard } from "../../../basic/empty-card.component";
import { IdeaCardFooter } from "./idea-card-footer.component";
import { RichText } from "../../../basic/rich-text.component";
import { UpperRoundedLargeImage } from "../../../basic/upper-rounded-large-image.component";
import { cn } from "../../../../lib/utils";
import { useEffect, useRef, useState } from "react";
import RichTextEditor from "../../inputs/rich-text-editor.component";
import { Image } from "../../../../types/Image";
import { IdeaCard } from "../../../../types/ideaCard";

interface TextCardProps extends CommonComponentProps {
  id?: string;
  data: IdeaCard;
  isReadOnly?: boolean;
  onDelete?: () => void;
  onUpdate?: (updatedData: Partial<IdeaCard>) => void;
}

export function TextCard({ className, data, isReadOnly = true, onDelete, onUpdate, id }: TextCardProps) {
  // const [cardImage, setCardImage] = useState<Image | null>(null);
  const [textCount, setTextCount] = useState<number>(data.content?.length ?? 0);
  const readCounter = 0;
  const saveCounter = 0;

  const editableContent = !isReadOnly && (
    <>
      <UpperRoundedLargeImage src={data.image ?? ""}
        isReadOnly={false}
        // setCardImage={setCardImage}
        onUpdate={onUpdate}
        id={data.ideaCardId}
      />
      <input
        className="w-full px-2 text-3xl font-bold text-left outline-none" placeholder="Tiêu đề"
        value={data.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate && onUpdate({ title: e.target.value ?? "" })}
      />
      <RichTextEditor
        textContent={data.content ?? ""}
        onUpdate={onUpdate}
        setTextCount={setTextCount}
      />
      <IdeaCardFooter isReadOnly={false}
        textCounter={textCount}
        handleDeleteCard={onDelete} />
    </>
  )

  const readonlyContent = isReadOnly && (
    <>
      <UpperRoundedLargeImage src={data.image ?? ""} />
      <span className="w-full text-2xl font-bold text-left">{data.title}</span>
      <RichText text={data.content} />
      <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
    </>
  )

  return (
    <EmptyCard id={id} className={cn("w-[544px] border-black shadow-[0px_20px_20px_10px_#00000024]", className)}>
      {editableContent || readonlyContent}
    </EmptyCard >
  );
}