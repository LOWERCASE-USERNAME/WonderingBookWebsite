import React from "react";

interface SideWidgetOption {
  options: {
    id: string;
    name: string;
    icon: React.ReactNode;
    handleClick: (event: React.MouseEvent) => void;
  }[];
  type?: "radio" | "checkbox";
}

export const SideWidget = ({ options, type = "radio" }: SideWidgetOption) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-16 transition-all duration-500 ease-in-out">
      <article className="left-0 inline-block w-full duration-500 ease-in-out bg-white border border-gray-700 border-solid rounded-2xl">
        {options.map(({ id, name, icon, handleClick }) => (
          <label
            key={id}
            htmlFor={id}
            className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-black rounded-xl"
          >
            <input
              className="hidden peer/expand"
              type={type}
              name={type === "radio" ? name : undefined}
              id={id}
              onClick={(e) => handleClick(e)}
            />
            <span className="text-2xl duration-300 ease-in-out peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 peer-checked/expand:scale-125">
              {icon}
            </span>
          </label>
        ))}
      </article>
    </div >
  );
};
