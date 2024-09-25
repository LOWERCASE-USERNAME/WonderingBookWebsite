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

interface TextCardProps extends CommonComponentProps {
  data: IdeaCardData;
  isReadOnly?: boolean;
  onDelete?: () => void;
  onUpdate?: (updatedData: Partial<IdeaCardData>) => void;
}

export function TextCard({ className, data: { id, imageSrc, text, readCounter, saveCounter, title }, isReadOnly = true, onDelete, onUpdate }: TextCardProps) {
  // const [cardImage, setCardImage] = useState<Image | null>(null);
  const [textCount, setTextCount] = useState<number>(text?.length ?? 0);

  const editableContent = !isReadOnly && (
    <>
      <UpperRoundedLargeImage src={imageSrc}
        isReadOnly={false}
        // setCardImage={setCardImage}
        onUpdate={onUpdate}
        id={id}
      />
      <input
        className="w-full px-2 text-2xl font-bold text-left outline-none" placeholder="Tiêu đề"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate && onUpdate({ title: e.target.value ?? "" })}
      />
      <RichTextEditor
        textContent={text ?? ""}
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
      <UpperRoundedLargeImage src={imageSrc} />
      <span className="w-full text-2xl font-bold text-left">{title}</span>
      <RichText text={text} />
      <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
    </>
  )

  return (
    <EmptyCard className={cn("w-[544px] border-2 border-black", className)}>
      {editableContent || readonlyContent}
    </EmptyCard >
  );
}