import React from "react";

interface BookCardProps {
  children?: React.ReactNode;
}

export function BookCard({ children }: BookCardProps) {
  return (
    <>
      <div className="w-10/12 bg-white">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 -space-x-1 overflow-hidden">
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="text-xs text-gray-500">Ayoub</span>
          </div>
          <div className="text-sm leading-loose text-gray-700">
            A counterintuitive approach to living a good life by focusing on
            what truly matters.
          </div>
        </div>
        <div className="my-4 flex items-center">
          <img
            className="mx-8 h-28"
            src="../../../Subtle_Art_Of_Not_Giving_A_Fuck.png"
          />
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-lg font-bold tracking-tight">
                The Subtle Art of Not Giving a F*ck
              </div>
              <div className="text-xs text-gray-500">by Mark Manson</div>
            </div>
            <div className="flex gap-6 text-sm text-gray-700">
              <span>10 ideas</span>
              <span>9.95k reads</span>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
