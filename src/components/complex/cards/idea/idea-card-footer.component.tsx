import { memo, useContext, useEffect, useState } from "react";
import { CommonComponentProps } from "../../../../lib/props";
import { cn } from "../../../../lib/utils";
import { CARD_CHARACTER_LIMIT } from "./const";

interface IdeaCardFooterProps extends CommonComponentProps {
  isReadOnly?: boolean;
  textCounter?: number;
  saveCounter?: number;
  readCounter?: number;
  handleDeleteCard?: () => void;
}

export const IdeaCardFooter = function ({ className, readCounter, saveCounter, isReadOnly = true, textCounter = 0, handleDeleteCard }: IdeaCardFooterProps) {

  return (
    <div className={cn("w-full flex justify-between text-[0.6rem]) -mb-4", className)}>
      <div className="flex items-center gap-2">
        {!isReadOnly ?
          (textCounter != 0 && <span className="mb-1 text-sm">{textCounter} / {CARD_CHARACTER_LIMIT}</span>)
          :
          <div className="flex gap-4">
            <div className="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check size-5">
                <circle cx="12" cy="12" r="10" />
                <path stroke="" d="m9 12 2 2 4-4" />
              </svg>
              <span className="text-xs text-gray-700">{readCounter || 0} lượt đọc</span>
            </div>
            <div className="flex gap-1">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              </div>
              <span className="text-xs text-gray-700">{saveCounter || 0} lượt lưu</span>
            </div>
          </div>}
      </div>
    </div>
  );
}
