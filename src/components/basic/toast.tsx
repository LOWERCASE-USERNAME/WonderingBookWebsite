import React from 'react';
import { cn } from '../../lib/utils';

interface CustomToastProps {
  variant: 'success' | 'error' | 'loading' | 'info';
  title?: string;
  message?: string;
  onClose?: () => void;
  containsLink?: boolean;
}

const variantStyles = {
  success: 'text-green-600',
  error: 'text-red-600',
  loading: 'text-slate-600',
  info: 'text-blue-600',
};

const variantTitles = {
  success: 'Thành công',
  error: 'Thất bại',
  loading: 'Đang xử lý',
  info: 'Thông tin',
}


const CustomToast: React.FC<CustomToastProps> = ({ variant, title, message, onClose, containsLink }) => {
  return (
    <div className="max-w-5xl px-4 mx-auto md:px-8">
      <div className="flex justify-between p-4 border border-green-300 rounded-md bg-green-50">
        <div className="flex items-start w-full gap-3">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6", variantStyles[variant])} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="self-center flex-1">
            <span className={cn("font-medium", variantStyles[variant])} >
              {title ?? variantTitles[variant]}
            </span>
            <div className={`${variantStyles[variant]}`}>
              <p className="mt-2 sm:text-sm">
                {message}
              </p>
              {containsLink && (<div className="mt-2">
                <a
                  href="javascript:void(0)"
                  className="inline-flex items-center font-medium hover:underline sm:text-sm">
                  Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              )}
            </div>
          </div>
          <button className="" onClick={() => onClose && onClose()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={cn("w-5 h-5", variantStyles[variant])}>
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </div >
  );
};

export default CustomToast;
