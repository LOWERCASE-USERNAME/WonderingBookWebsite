import React, { useEffect, useState } from "react";
import { CommonComponentProps } from "../../../../lib/props";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { cn } from "../../../../lib/utils";

interface TableOfContentCardProps extends CommonComponentProps {
  lsContent: { id: string, title: string }[];
}

export const TableOfContentCard = ({ lsContent }: TableOfContentCardProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);
  const isHashActive = (id: string) => activeId === id;

  useEffect(() => {
    if (location.hash) {
      const cardId = location.hash.substring(1); // Remove the '#' symbol
      const cardElement = document.getElementById(cardId);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      let foundActiveId = false;

      // Loop through content and determine which one is in view
      for (const content of lsContent) {
        const element = document.getElementById(content.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveId(content.id);
            foundActiveId = true;
            break;
          }
        }
      }

      // If no card is active (e.g., scrolled to the top), remove the fragment
      if (!foundActiveId) {
        setActiveId(null);
        if (location.hash) {
          navigate("", { replace: true });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lsContent, location.hash, navigate]);

  const handleLinkClick = (id: string) => {
    navigate(`#${id}`, { replace: true });
  }

  return (
    <div className="sticky top-8 shadow-[-4px_4px_0px_0px_#86AB89] flex flex-col justify-between w-64 p-4 text-lg font-semibold text-white bg-gray-900 rounded-xl h-fit">
      <span>Trong bài tóm tắt này</span>
      <div className="space-y-2">
        {lsContent.map(content =>
          <p

            onClick={() => handleLinkClick(content.id)}
            className={cn("py-1 pl-3 text-sm border-l-2 border-gray-400 text-ellipsis text-nowrap overflow-hidden",
              isHashActive(content.id) ? "text-azure-100 bg-[#86AB89]" : "text-gray-400 cursor-pointer hover:text-[#87ef8f]")} >
            {content.title}
          </p>
        )}
      </div>
    </div >
  );
};