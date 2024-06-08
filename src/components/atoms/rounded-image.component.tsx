import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";

interface RoundedImageProps extends CommonComponentProps {
  src?: string;
}

export function RoundedImage({ children, src, className }: RoundedImageProps) {
  return (
    <>
      <img className={cn(" rounded-full w-36 h-36", className)} src={src} />
      {children}
    </>
  );
}
