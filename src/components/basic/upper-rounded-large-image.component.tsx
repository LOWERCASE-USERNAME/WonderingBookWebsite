import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";

interface UpperRoundedLargeImageProps extends CommonComponentProps {
  src?: string;
}

export function UpperRoundedLargeImage({ children, className, src }: UpperRoundedLargeImageProps) {
  return (
    <>
      <img className={cn("object-cover min-w-[544px] h-40 rounded-t-2xl -mt-4", className)} src={src} />
      {children}
    </>
  );
}
