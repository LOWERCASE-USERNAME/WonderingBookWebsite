import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";

interface BlockQuoteProps extends CommonComponentProps {
  text?: string;
  author?: string;
}

export function BlockQuote({ children, className, text, author }: BlockQuoteProps) {
  return (
    <>
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <blockquote>
          <p className="text-sm italic leading-relaxed">"{text}"</p>
        </blockquote>
        <span className="m-auto text-lg font-bold">{author}</span>
      </div>
      {children}
    </>
  );
}
