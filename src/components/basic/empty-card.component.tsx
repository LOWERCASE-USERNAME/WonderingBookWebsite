import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";

interface EmptyCardProps extends CommonComponentProps {
}

export function EmptyCard({ children, className }: EmptyCardProps) {
  return (
    <>
      <div className={cn("bg-white rounded-2xl p-4 flex flex-col justify-center items-center gap-6", className)}>
        {children}
      </div>
    </>
  );
}
