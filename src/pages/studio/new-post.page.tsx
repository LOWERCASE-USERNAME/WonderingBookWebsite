import { Text, ImagePlus, Quote, HelpCircle, Trash2, ChevronsDown, ChevronsUp, RotateCcw } from "lucide-react";
import { EmptyCard } from "../../components/basic/empty-card.component";
import Navigation from "../../components/navigations/navigation";
import { IdeaCardData } from "../../types/IdeaCardData";
import { ChangeEvent, useRef, useState } from "react";
import { TextCard } from "../../components/complex/cards/idea/text-card.component";
import { QuoteCard } from "../../components/complex/cards/idea/quote-card.component";
import { ImageCard } from "../../components/complex/cards/idea/image-card.component";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import { PostData } from "../../types/PostData";
import { RoundedImage } from "../../components/basic/rounded-image.component";
import { GlowingButton } from "../../components/basic/button";
import { SideWidget } from "../../components/complex/widgets/side-widget";

interface Props {
  params: {
    id: string;
  };
}

const widgetOptions = [
  { id: 'undo', name: 'path', icon: <RotateCcw />, handleClick: () => { } },
  { id: 'moveup', name: 'path', icon: <ChevronsUp />, handleClick: () => { } },
  { id: 'movedown', name: 'path', icon: <ChevronsDown />, handleClick: () => { } },
  { id: 'help', name: 'path', icon: <HelpCircle />, handleClick: () => { } },
  { id: 'delete', name: 'path', icon: <Trash2 />, handleClick: () => { } },
];

export default function NewPost({ params }: Props) {
  const { id } = params;
  const location = useLocation();
  const initData: PostData = location.state || {};
  console.log(initData)
  const [postData, setPostData] = useState<PostData>(initData);
  const [userInfo, setUserInfo] = useState<object | null>(null);
  const [draftCards, setDraftCards] = useState<IdeaCardData[]>([]);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdatePost = (id: string, updatedPostData: Partial<PostData>) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      ...updatedPostData
    }));
  }

  const handleAddCard = (type: "text" | "image" | "quote") => {
    setDraftCards(prevDraftCards => [...prevDraftCards, {
      id: uuidv4(),
      order: prevDraftCards.length,
      type
    }]);
  }

  const handleDeleteCard = (id: string) => {
    setDraftCards(draftCards.filter(card => card.id !== id));
  };

  const handleUpdateCard = (id: string, updatedCardData: Partial<IdeaCardData>) => {
    setDraftCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, ...updatedCardData } : card))
    );
  };

  const handleMoveCard = (id: string, direction: "up" | "down") => {
  }

  const handleResetCard = (id: string) => {

  }

  const handleDisplayHelp = (cardType: "text" | "image" | "quote") => {
    switch (cardType) {
      case 'text':
      case 'image':
      case 'quote':
      default:
        return null;
    }
  }

  const handleRenderCard = (card: IdeaCardData, index: number) => {
    switch (card.type) {
      case 'text':
        return (
          <TextCard data={card} isReadOnly={false} key={index}
            onDelete={() => handleDeleteCard(card.id)}
            onUpdate={(updatedData: Partial<IdeaCardData>) => handleUpdateCard(card.id, updatedData)}
          />
        );
      case 'image':
        return (
          <ImageCard data={card} isReadOnly={false} key={index}
            onDelete={() => handleDeleteCard(card.id)}
            onUpdate={(updatedData: Partial<IdeaCardData>) => handleUpdateCard(card.id, updatedData)}
          />
        );
      case 'quote':
        return (
          <QuoteCard data={card} isReadOnly={false} key={index}
            onDelete={() => handleDeleteCard(card.id)}
            onUpdate={(updatedData: Partial<IdeaCardData>) => handleUpdateCard(card.id, updatedData)}
          />
        );
      default:
        return null;
    }
  }

  const handleUpdateTitle = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = titleRef.current;
    if (textarea != null) {
      textarea.style.height = 'auto'; // Reset height to auto to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
    handleUpdatePost(id ?? postData.id, { title: event.target.value })
  }

  return (
    <div className="container flex flex-col gap-6">
      <nav className="h-12">
        <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      </nav>
      <section className="flex p-4 bg-white">
        <EmptyCard className="flex-1">
          <RoundedImage
            className="mx-8 rounded-xl"
            src={postData.imageSrc}
            isReadOnly={false}
            onUpdate={(updatedData: Partial<PostData>) => handleUpdatePost(id ?? postData.id, updatedData)}
          />
        </EmptyCard>
        <div className="flex-[2_1_auto]">
          <textarea className="w-full px-1 mt-4 overflow-hidden text-2xl font-semibold outline-none resize-none"
            value={postData.title}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleUpdateTitle(e)}
            placeholder="Tiêu đề" spellCheck={false} ref={titleRef} rows={1} />
          <h2 className="mt-4 italic">
            By <input className="px-1 text-lg italic font-bold outline-none"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpdatePost(id ?? postData.id, { author: e.target.value })}
              placeholder="Tác giả" spellCheck={false} />
          </h2>
          {/* : <h2 className="mt-4 italic">By <span className="text-lg font-bold">{postData.author}</span></h2>} */}
          {/* {additionalInfo} */}
          {/* {actionBar} */}
          <GlowingButton content="Đăng bài viết" className="mt-8 bg-[#E1DCC5]" />
        </div>
        <EmptyCard className="flex-1">

        </EmptyCard>
      </section >
      <div className="grid grid-cols-5">
        <section className="w-full col-span-3">
          <div className="flex flex-col items-start justify-center gap-8 ml-16 h-fit">
            {draftCards.map((draftCard: IdeaCardData, idx) => {
              return (
                <div className="flex gap-4">
                  {handleRenderCard(draftCard, idx)}
                  <SideWidget options={widgetOptions} />
                </div>
              );
            })}
          </div>
          <div className={`flex gap-2 ml-16 ${draftCards.length > 0 ? "mt-8" : "mt-0"}`}>
            <div className="flex-1 h-24 bg-red-100 w-36 rounded-bl-2xl rounded-tl-2xl">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard("text")}>
                <Text size={32} />
                <span>Thẻ ký tự mới</span>
              </button>
            </div>
            <div className="flex-1 h-24 bg-red-100 w-36">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard("image")}>
                <ImagePlus size={32} />
                <span>Thẻ hình ảnh mới</span>
              </button>
            </div>
            <div className="flex-1 h-24 bg-red-100 w-36 rounded-br-2xl rounded-tr-2xl">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard("quote")}>
                <Quote size={32} />
                <span>Thẻ trích dẫn mới</span>
              </button>
            </div>
          </div>
        </section>
        <aside className="w-full col-span-2 col-start-4">
          {/* {sideContent} */}
        </aside>
      </div >
    </div >
  );
}
