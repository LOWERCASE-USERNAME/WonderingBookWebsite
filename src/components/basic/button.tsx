import { CommonComponentProps } from "../../lib/props"
import { cn } from "../../lib/utils"

interface ButtonProps extends CommonComponentProps {
  content: string;
  onClick?: (event: React.MouseEvent) => void;
}

export const GlowingButton = ({ className, content, onClick }: ButtonProps) => (
  <button
    onClick={(e) => onClick && onClick(e)}
    className={cn("px-4 py-2 rounded-lg bg-[#d5f365] border-none font-inherit cursor-pointer transition-transform duration-400 hover:shadow-[7px_5px_56px_-14px_#C3D900] active:transform active:scale-95 active:shadow-[7px_5px_56px_-10px_#C3D900]", className)} >
    <strong>{content}</strong>
  </button >
)

export const MovingParticleButton = ({ className, content }: ButtonProps) => (
  <button className={cn("group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg", className)} >
    {content}
  </button >
) 