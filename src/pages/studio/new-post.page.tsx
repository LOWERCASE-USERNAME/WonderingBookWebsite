import { Text, ImagePlus, Quote } from "lucide-react";
import { EmptyCard } from "../../components/basic/empty-card.component";
import Navigation from "../../components/navigations/navigation";
import { IdeaCardData } from "../../types/IdeaCardData";
import { useCallback, useState } from "react";
import { TextCard } from "../../components/complex/cards/idea/text-card.component";
import { QuoteCard } from "../../components/complex/cards/idea/quote-card.component";
import { ImageCard } from "../../components/complex/cards/idea/image-card.component";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  params: {
    id: string;
  };
}

export default function NewPost({ params }: Props) {
  const { id } = params;
  const [draftCards, setDraftCards] = useState<IdeaCardData[]>([]);

  console.log(draftCards);
  const handleAddCard = (type: "text" | "image" | "quote") => {
    setDraftCards([...draftCards, {
      id: uuidv4(),
      type
    }]);
  }

  const handleDeleteCard = (id: string) => {
    // console.log(id);
    // console.log(draftCards.filter(card => card.id !== id))
    setDraftCards(draftCards.filter(card => card.id !== id));
  };

  const handleUpdateCard = (id: string, updatedData: Partial<IdeaCardData>) => {
    console.log("updated run");
    setDraftCards((prevCards) =>
      prevCards.map((card) => (card.id === id ? { ...card, ...updatedData } : card))
    );
  };

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

  return (
    <div className="container flex flex-col gap-6">
      <nav className="h-12">
        <Navigation />
      </nav>
      <section className="flex p-4 bg-white">
        <EmptyCard>
          <img
            className="mx-8 h-28"
            src="../../../Subtle_Art_Of_Not_Giving_A_Fuck.png"
          />
        </EmptyCard>
        <div>
          <h1 className="text-2xl font-semibold">Atomic Habits</h1>
          <h2 className="italic">By <span className="text-lg font-bold">James Clear</span></h2>
          {/* {additionalInfo} */}
          {/* {actionBar} */}
        </div>
      </section>
      <div className="grid grid-cols-5">
        <section className="w-full col-span-3">
          <div className="flex flex-col items-center justify-center gap-8 h-fit">
            {draftCards.map((draftCard: IdeaCardData, idx) => handleRenderCard(draftCard, idx))}
          </div>
          <div className={`flex gap-2 ${draftCards.length > 0 ? "mt-8" : "mt-0"}`}>
            <div className="flex-1 w-48 h-24 bg-red-100 rounded-bl-2xl rounded-tl-2xl">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard("text")}>
                <Text size={32} />
                <span>Thẻ ký tự mới</span>
              </button>
            </div>
            <div className="flex-1 w-48 h-24 bg-red-100">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard("image")}>
                <ImagePlus size={32} />
                Thẻ hình ảnh mới</button>
            </div>
            <div className="flex-1 w-48 h-24 bg-red-100 rounded-br-2xl rounded-tr-2xl">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard("quote")}>
                <Quote size={32} />
                Thẻ trích dẫn mới</button>
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
