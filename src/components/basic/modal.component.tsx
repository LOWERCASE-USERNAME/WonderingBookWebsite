import React, { useEffect } from 'react';
import { cn } from '../../lib/utils';

interface Props {
  open: boolean;
  cancelFn?: () => void;
  primaryFn?: () => void;
  contentString?: string;
  titleString?: string;
  contentNode?: React.ReactNode;
  titleNode?: React.ReactNode;
  className?: string;
  variant?: "danger";
  size?: "md" | "lg" | "xl";
}

export const Modal: React.FC<Props> = (props) => {
  const { open, cancelFn, primaryFn, variant, size = "md", titleNode, contentNode } = props;

  let titleContent = props.titleString;
  let content = props.contentString;
  let icon = null;

  if (open) {
    document.body.style.overflow = 'hidden';
  }

  // simple useEffect to capture ESC key to close the modal 
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        if (cancelFn) {
          cancelFn();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, cancelFn]);

  switch (variant) {
    case "danger":
      titleContent = titleContent ?? "Bạn có chắc muốn thực hiện hành động này?";
      icon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 w-full h-full">
      <div className='fixed inset-0 w-full h-full bg-black opacity-40'></div>
      <div className={cn("fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 w-full max-w-md bg-white rounded-xl shadow-lg max-h-screen", size ? `max-w-${size}` : "max-w-md")} >
        {icon && <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          {icon}
        </div>}
        {/* <div className="flex px-4 py-2"> */}
        <div className="mt-4 ml-4 text-left">
          <div className="flex justify-between">
            {titleNode ? titleNode : <h2 className="text-2xl font-semibold text-gray-800">{titleContent}</h2>}
          </div>
          {contentNode ? contentNode : <p className="py-4 leading-relaxed text-gray-500">{content}</p>}
          <div className="flex justify-between h-10 gap-4 ml-auto text-sm">
            <button
              onClick={cancelFn}
              aria-label="Close" className="flex-1 text-gray-800 border rounded-xl bg-slate-200 ring-offset-2 ring-slate-200 focus:ring-2 hover:bg-slate-300">
              Hủy
            </button>
            <button
              onClick={primaryFn}
              className={cn("flex-1 text-white rounded-xl ring-offset-2 focus:ring-2 bg-indigo-500 ring-indigo-500 hover:bg-indigo-600", variant == "danger" ? "bg-red-500 ring-red-500 hover:bg-red-600" : "")}>
              Xác nhận
            </button>
          </div>
          {/* </div> */}
        </div >
      </div >
    </div >
  );
};