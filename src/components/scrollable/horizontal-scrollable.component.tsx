import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { CommonComponentProps } from "../../lib/props";
import { MoveLeft, MoveRight } from "lucide-react";

interface ScrollableProps extends CommonComponentProps {
  defaultScrollAmount?: number;
  isHideArrows?: boolean;
  isWrapAround?: boolean;
}

export function HorizontalScrollable({ children, className, defaultScrollAmount, isHideArrows = true, isWrapAround = false }: ScrollableProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragMultiplier = 1;
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      if (isHideArrows) {
        setShowLeftArrow(scrollLeft > 0); // Show left arrow if not at the start
        setShowRightArrow(Math.round(scrollLeft + clientWidth) < scrollWidth); // Show right arrow if not at the end
      } else {
        setShowLeftArrow(true);
        setShowRightArrow(true);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * dragMultiplier; // Adjust the multiplier for scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * dragMultiplier; // Adjust the multiplier for scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      const scrollAmount = defaultScrollAmount ?? clientWidth / 2; // Adjust scroll amount as needed

      if (direction === "left") {
        if (scrollLeft - scrollAmount < 0 && isWrapAround) {
          scrollContainerRef.current.scrollTo({
            left: scrollWidth - clientWidth,
            behavior: "smooth",
          });
        } else {
          scrollContainerRef.current.scrollTo({
            left: scrollLeft - scrollAmount,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollLeft + scrollAmount > scrollWidth && isWrapAround) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          scrollContainerRef.current.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };


  return (
    <>
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && <button
          onClick={() => scroll("left")}
          className="absolute z-10 p-2 text-white transform -translate-y-1/2 rounded-full scroll-arrow left top-1/2 left-2 bg-black/50"
        >
          <MoveLeft />
        </button>}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className={cn("flex overflow-x-auto scrollbar-hide", className)}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children} {/* Render the children passed to this component */}
        </div>

        {/* Right Arrow */}
        {showRightArrow && <button
          onClick={() => scroll("right")}
          className="absolute z-10 p-2 text-white transform -translate-y-1/2 rounded-full scroll-arrow right top-1/2 right-2 bg-black/50"
        >
          <MoveRight />
        </button>}
      </div>
    </>
  );
}
