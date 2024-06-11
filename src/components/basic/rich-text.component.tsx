import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";
import DOMPurify from 'dompurify';

interface RichTextProps extends CommonComponentProps {
  text?: string;
}

export function RichText({ children, className, text }: RichTextProps) {
  const sanitizedHTML = DOMPurify.sanitize(text || "");
  return (
    <>
      <p className={cn("text-sm text-gray-700 text-left w-full", className)} dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p >
      {children}
    </>
  );
}
