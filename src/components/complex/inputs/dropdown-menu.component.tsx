import React, { useState, useEffect, useRef } from "react";
import { CommonComponentProps } from "../../../lib/props";
import { cn } from "../../../lib/utils";

interface DropdownMenuProps extends CommonComponentProps {
  buttonIcon?: React.ReactNode;
  buttonLabel?: string; // The label for the dropdown button
  options: { label: string; action: (event: React.MouseEvent) => void; icon: React.ReactNode }[]; // Array of options with label and action
  direction?: "up" | "down" | "left" | "right"
}

export default function DropdownMenu({
  buttonLabel,
  options,
  buttonIcon,
  className,
  direction = "down"
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (event: React.MouseEvent) => {
    event?.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className={cn(`inline-flex justify-center w-full px-4 py-2 text-sm font-medium focus:outline-none rounded-md`, className)}
        onClick={toggleDropdown}
      >
        {buttonLabel}
        {buttonIcon ?? <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>}
      </button>

      {isOpen && (
        <div
          className={cn(`absolute right-0 z-10 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${direction === "down" && "mt-2 top-full"} ${direction === "up" && "mb-2 -top-full"}`, className)}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={(event) => {
                  option.action(event); // Execute the passed action
                  setIsOpen(false); // Close the dropdown after action
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                tabIndex={-1}
              >
                <div className="flex justify-around">
                  <span>{option.icon}</span>
                  <span className="">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )
      }
    </div >
  );
}