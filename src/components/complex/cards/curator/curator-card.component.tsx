import { CommonComponentProps } from "../../../../lib/props";
import { cn } from "../../../../lib/utils";
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
    <div className="relative h-fit">
      <EmptyCard className={cn("sticky text-left rounded-none h-fit top-8", className)}>
        <div className="flex flex-col w-full gap-2">
          <span className="text-2xl font-bold">Ý TƯỞNG ĐƯỢC CHỌN LỌC BỞI</span>
          <div className="flex items-center gap-4">
            <RoundedImage src={imageSrc} className="w-16 h-16" />
            <div className="flex flex-col flex-1">
              <span className="text-lg font-semibold tracking-tight">{name}</span>
              <span className="text-xs font-medium">{identifier}</span>
            </div>
            <div>
              <button className="px-8 py-2 text-sm font-semibold border-2 border-black rounded-full">
                Theo dõi
              </button>
            </div>
          </div>
          <p>{description}</p>
        </div>
        <div className="w-full">
          <span className="text-lg font-bold leading-loose">GHI CHÚ CỦA NGƯỜI TÓM TẮT</span>
          <p className="whitespace-pre-line">{note}</p>
        </div>
      </EmptyCard>
    </div>

  );
}
