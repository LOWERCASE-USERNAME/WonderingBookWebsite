import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";
import DOMPurify from 'dompurify';

interface RichTextProps extends CommonComponentProps {
  text?: string;
}

export function RichText({ className, text }: RichTextProps) {
  const sanitizedHTML = DOMPurify.sanitize(text || "");
  return (
    <p className={cn(" text-gray-700 text-left w-full", className)}>
      <p className="rich-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p>
    </p >
  );
}
