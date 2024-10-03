import { CommonComponentProps } from "../../lib/props";
import { cn } from "../../lib/utils";

interface UpperRoundedLargeImageProps extends CommonComponentProps {
  src?: string;
  id?: string;
  isReadOnly?: boolean;
  setCardImage?: (image: { data: File }) => void;
  isUnrestricted?: boolean;
  onUpdate?: (updatedData: Partial<object>) => void;
}

export function UpperRoundedLargeImage({ className, src, id, isReadOnly = true, setCardImage, isUnrestricted = false, onUpdate }: UpperRoundedLargeImageProps) {
  const handleChooseImage = () => {
    const fileInput = document.getElementById(`fileInput#${id}`) as HTMLInputElement;
    fileInput?.click();
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { //only take 1 image
    // setCardImage && event.target.files && setCardImage({ data: event.target.files[0] });
    event.target.files && onUpdate && onUpdate({ image: URL.createObjectURL(event.target.files[0]) })
  };

  if (src) {
    if (isUnrestricted) {
      return (
        <img className={cn("object-cover min-w-[544px] h-fit rounded-t-2xl -mt-4 px-1", className)} src={src} />
      )
    }

    return (
      <img className={cn("object-cover min-w-[544px] h-40 rounded-t-2xl -mt-4 px-1", className)} src={src} />
    );
  }

  if (!isReadOnly) {

    return (
      <label
        className={cn(`object-cover min-w-[544px] rounded-t-2xl -mt-4 ${isUnrestricted ? "h-96" : "h-40"}`, className)} htmlFor="file"
        onClick={handleChooseImage}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <svg width="80px" xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
            <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill=""
                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </g>
          </svg>
          <span>Thêm hình ảnh mới</span>
        </div>
        <input type="file" id={`fileInput#${id}`} accept="image/*" onChange={(event) => handleFileChange(event)} className="hidden" />
        <hr className="w-[90%] mx-auto border-black" />
      </label>
      // <button className={cn("object-cover min-w-[544px] h-40 rounded-t-2xl -mt-4 bg-orange-400", className)} onClick={() => ""}> Thêm hình ảnh</ button>
    )
  }
  return (
    <img className={cn("object-cover min-w-[544px] h-40 rounded-t-2xl -mt-4 px-1", className)} src={src} />
  );
}
