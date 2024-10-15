import { useEffect, useRef, useState } from "react";
import { CommonComponentProps } from "../../../../lib/props";
import { EmptyCard } from "../../../basic/empty-card.component";
import ColorThief from 'colorthief';
import { cn } from "../../../../lib/utils";

interface PostImageCardProps extends CommonComponentProps {
  imageSrc?: string;
}

export function PostImageCard({ children, className, imageSrc }: PostImageCardProps) {
  const [dominantColor, setDominantColor] = useState([0, 0, 0]); // Default to black
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    const colorThief = new ColorThief();

    if (imageElement?.complete) {
      // Image is already loaded
      getColor(imageElement);
    } else {
      // Wait until the image has loaded
      imageElement?.addEventListener('load', () => {
        getColor(imageElement);
      });
    }

    function getColor(image) {
      const color = colorThief.getColor(image);
      console.log(color);
      setDominantColor(color);
    }
  }, [imageSrc]);

  const shadowColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.7)`;

  return (
    <EmptyCard className={cn("p-8 shadow-xl relative bg-[#FAF7F3]", className)}>
      <div className="mx-8 h-1/2" style={{
        boxShadow: `0px 4px 20px 10px ${shadowColor}`
      }}>
        < img
          // crossOrigin="anonymous"
          className="relative h-36 -top-1/2"
          src={imageSrc}
          ref={imageRef}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = "image_not_found.png"; // Fallback image
          }}
        />
      </div>
    </EmptyCard >
  );
}