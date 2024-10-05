import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";

interface EmptyCardProps extends CommonComponentProps {
  id?: string;
  onClick?: () => void;
}

export function EmptyCard({ children, className, onClick, id }: EmptyCardProps) {
  return (
    <div id={id} className={cn("bg-white rounded-2xl p-4 flex flex-col justify-center items-center gap-6", className)}
      onClick={onClick}>
      {children}
    </div>
  );
}
