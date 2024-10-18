import { CommonComponentProps } from "../../../../../lib/props";
import { cn } from "../../../../../lib/utils";

interface ButtonContainerProps extends CommonComponentProps {

}

interface ButtonProps extends CommonComponentProps {
  onClick: () => void;
}

export const ChatbotButtonContainer = (props: ButtonContainerProps) => {
  return (
    <div className={cn("flex flex-wrap items-end gap-2", props.className)}>
      {props.children}
    </div>
  )
}

export const ChatbotButton = (props: ButtonProps) => {
  return (
    <button className={cn("rounded-2xl px-4 py-1 border-2 border-black min-w-16 max-w-72 text-left text-[0.9rem]", props.className)} onClick={props.onClick}>
      {props.children}
    </button>
  )
}