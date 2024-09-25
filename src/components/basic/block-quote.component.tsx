import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";
import { IdeaCardData } from "../../types/IdeaCardData";

interface BlockQuoteProps extends CommonComponentProps {
  text?: string;
  author?: string;
  isReadOnly?: boolean;
  onUpdate?: (updatedData: Partial<IdeaCardData>) => void;
  setTextCount?: (count: number) => void;
}

export function BlockQuote({ className, text, author, isReadOnly = true, onUpdate, setTextCount }: BlockQuoteProps) {

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <blockquote>
        {isReadOnly
          ?
          <p className="text-sm italic leading-relaxed">"{text}"</p>
          :
          <div>
            <textarea className="text-sm italic leading-relaxed text-center outline-none resize-none"
              placeholder="Một câu trích dẫn thú vị" cols={60} rows={4}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                onUpdate && onUpdate({ text: e.target.value })
                setTextCount && setTextCount(e.target.value.length)
              }}
            />
          </div>
        }
      </blockquote>
      {
        isReadOnly ?
          <span className="m-auto text-lg font-bold">{author}</span>
          : <input className="m-auto text-lg font-bold text-center outline-none"
            placeholder="Tên danh nhân" maxLength={20}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onUpdate && onUpdate({ author: e.target.value })
            }}
          />
      }
    </div>
  );
}
