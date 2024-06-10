import { CommonComponentProps } from "../../lib/props";
import { IdeaCardData } from "../../types/IdeaCardData";
import { EmptyCard } from "../atoms/empty-card.component";
import { IdeaCardFooter } from "../molecules/idea-card-footer.component";
import { RichText } from "../atoms/rich-text.component";
import { UpperRoundedLargeImage } from "../atoms/upper-rounded-large-image.component";
import { cn } from "../../lib/utils";

interface TextCardProps extends CommonComponentProps {
  data: IdeaCardData;
}

export function TextCard({ children, className, data: { imageSrc, text, readCounter, saveCounter, title } }: TextCardProps) {
  return (
    <>
      <EmptyCard className={className}>
        <UpperRoundedLargeImage src={imageSrc} />
        <span className="w-full text-2xl font-bold text-left">{title}</span>
        <RichText text={text} />
        <IdeaCardFooter readCounter={readCounter} saveCounter={saveCounter} />
      </EmptyCard >
      {children}
    </>
  );
}
