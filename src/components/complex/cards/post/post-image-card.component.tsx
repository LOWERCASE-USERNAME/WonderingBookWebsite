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

  // useEffect(() => {
  //   const imageElement = imageRef.current;
  //   const colorThief = new ColorThief();

  //   if (imageElement?.complete) {
  //     // Image is already loaded
  //     getColor(imageElement);
  //   } else {
  //     // Wait until the image has loaded
  //     imageElement?.addEventListener('load', () => {
  //       getColor(imageElement);
  //     });
  //   }

  //   function getColor(image) {
  //     const color = colorThief.getColor(image);
  //     console.log(color);
  //     setDominantColor(color);
  //   }
  // }, [imageSrc]);

  const shadowColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.7)`;

  return (
    <EmptyCard className={cn("shadow-xl relative bg-[#FAF7F3] object-cover", className)}>
      < img
        // crossOrigin="anonymous"
        className="object-contain w-40 h-40"
        src={imageSrc != null && imageSrc.length > 0 ? imageSrc : "/default_post_image.png"}
        ref={imageRef}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = "/image_not_found.png"; // Fallback image
        }}
      />
      {console.log(imageSrc)}
    </EmptyCard >
  );
}