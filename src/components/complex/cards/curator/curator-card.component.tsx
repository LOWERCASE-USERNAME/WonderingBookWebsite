import { CommonComponentProps } from "../../../../lib/props";
import { EmptyCard } from "../../../basic/empty-card.component";
import { RoundedImage } from "../../../basic/rounded-image.component";

interface CuratorCardProps extends CommonComponentProps {
  imageSrc?: string;
  name?: string;
  identifier?: string;
  description?: string;
  note?: string;
}

export function CuratorCard({ children, className, imageSrc, identifier, description, name, note }: CuratorCardProps) {
  return (
    <>
      <EmptyCard className="sticky text-left rounded-none top-8 h-fit">
        <div className="flex flex-col w-full gap-2">
          <span className="text-xl font-bold">IDEAS CURATED BY</span>
          <RoundedImage src={imageSrc} className="w-20 h-20" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">{name}</span>
            <span className="text-xs font-medium">{identifier}</span>
          </div>
          <p>{description}</p>
        </div>
        <div className="w-full">
          <span className="text-lg font-bold leading-loose">CURATOR'S NOTE</span>
          <p className="whitespace-pre-line">{note}</p>
        </div>
      </EmptyCard>
      {children}
    </>
  );
}
