import { Text, ImagePlus, Quote, HelpCircle, Trash2, ChevronsDown, ChevronsUp, RotateCcw } from "lucide-react";
import { EmptyCard } from "../../components/basic/empty-card.component";
import Navigation from "../../components/navigations/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TextCard } from "../../components/complex/cards/idea/text-card.component";
import { QuoteCard } from "../../components/complex/cards/idea/quote-card.component";
import { ImageCard } from "../../components/complex/cards/idea/image-card.component";
import React from "react";
import { v4 as uuidv4, v4 } from 'uuid';
import { useLocation, useNavigate } from "react-router-dom";
import { RoundedImage } from "../../components/basic/rounded-image.component";
import { GlowingButton } from "../../components/basic/button";
import { SideWidget } from "../../components/complex/widgets/side-widget";
import { getArticle, putArticle } from "../../services/articleService";
import { postIdeaCardBulk, putIdeaCardBulk } from "../../services/ideaCardService";
import { Article } from "../../types/article";
import { IdeaCard } from "../../types/ideaCard";
import { IdeaCardType } from "../../types/ideaCardType";
import { useFetchUserInfo } from "../../hooks/useFetchUserInfo";

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
  const navigate = useNavigate();
  const location = useLocation();
  const initData: Article = location.state || {};
  const [postData, setPostData] = useState<Article>(initData);
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [draftCards, setDraftCards] = useState<IdeaCard[]>([]);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response: Article = await getArticle(postData.articleId);
      setPostData(response);
      setDraftCards(response.ideaCards?.sort((a, b) => Number(a.order) - Number(b.order)) ?? []);
    }
    fetchData();
  }, []);

  const handleSubmitPost = async () => {
    try {
      const createFormData = new FormData();
      const updateFormData = new FormData();

      const createPromise = draftCards.filter(c => c.image == null || c.image.startsWith("blob:")).map(async (c, idx) => {
        const order = draftCards.indexOf(c);
        appendCardData(createFormData, c, idx, order);

        if (c.image) {
          const response = await fetch(c.image);
          const blob = await response.blob();
          createFormData.append(`ideaCards[${idx}].image`, blob);
        }
      });

      const updatePromise = draftCards.filter(c => c.image?.startsWith("https://") || c.image?.startsWith("http://")).map(async (c, idx) => {
        const order = draftCards.indexOf(c);
        appendCardData(updateFormData, c, idx, order);
        updateFormData.append(`ideaCards[${idx}].image`, c.image ?? "");
      });

      await Promise.all([Promise.all(createPromise), Promise.all(updatePromise)]);

      const [responseCreateIdeaCards, responseUpdateIdeaCards, responseArticle] = await Promise.all([
        !createFormData.entries().next().done && postIdeaCardBulk(createFormData),
        !updateFormData.entries().next().done && putIdeaCardBulk(updateFormData),
        (async () => {
          const articleFormData = new FormData();
          articleFormData.append("articleId", postData.articleId);
          articleFormData.append("title", postData.title);
          articleFormData.append("curatorNote", postData.curatorNote.length != 0 ? postData.curatorNote : "None");
          articleFormData.append("miscAuthor", String(postData.miscAuthor));

          if (postData.image) {
            const response = await fetch(postData.image);
            const blob = await response.blob();
            articleFormData.append("image", blob);
          }
          putArticle(articleFormData)
        })(),
      ]);

      // if (response != null) {
      //   navigate("/write", { state: {} });
      // }
    } catch (error) {
      console.error("Failed to create post", error);
    }
  }

  const appendCardData = (formData: FormData, card: any, idx: number, order: number) => {
    formData.append(`ideaCards[${idx}].ideaCardId`, card.ideaCardId);
    formData.append(`ideaCards[${idx}].articleId`, card.articleId);
    formData.append(`ideaCards[${idx}].title`, card.title);
    formData.append(`ideaCards[${idx}].content`, card.content);
    formData.append(`ideaCards[${idx}].order`, order.toString());
    formData.append(`ideaCards[${idx}].cardType`, card.cardType != null ? card.cardType.toString() : "");
  };

  const handleUpdatePost = (id: string, updatedPostData: Partial<Article>) => {
    setPostData(prevPostData => ({
      ...prevPostData,
      ...updatedPostData
    }));
  }

  const handleAddCard = (type: IdeaCardType) => {
    setDraftCards(prevDraftCards => [...prevDraftCards, {
      ideaCardId: uuidv4().toString(),
      order: prevDraftCards.length,
      cardType: type,
      articleId: postData.articleId,
      content: "",
      image: "",
      title: ""
    }]);
  }

  const handleDeleteCard = (id: string) => {
    setDraftCards(draftCards.filter(card => card.articleId !== id));
  };

  const handleUpdateCard = (id: string, updatedCardData: Partial<IdeaCard>) => {
    console.log(draftCards);
    setDraftCards((prevCards) =>
      prevCards.map((card) => (card.ideaCardId === id ? { ...card, ...updatedCardData } : card))
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

  const handleRenderCard = (card: IdeaCard, index: number) => {
    switch (card.cardType) {
      case IdeaCardType.Text:
        return (
          <TextCard data={card} isReadOnly={false} key={index}
            onDelete={() => handleDeleteCard(card.ideaCardId)}
            onUpdate={(updatedData: Partial<IdeaCard>) => handleUpdateCard(card.ideaCardId, updatedData)}
          />
        );
      case IdeaCardType.Image:
        return (
          <ImageCard data={card} isReadOnly={false} key={index}
            onDelete={() => handleDeleteCard(card.ideaCardId)}
            onUpdate={(updatedData: Partial<IdeaCard>) => handleUpdateCard(card.ideaCardId, updatedData)}
          />
        );
      case IdeaCardType.Quote:
        return (
          <QuoteCard data={card} isReadOnly={false} key={index}
            onDelete={() => handleDeleteCard(card.ideaCardId)}
            onUpdate={(updatedData: Partial<IdeaCard>) => handleUpdateCard(card.ideaCardId, updatedData)}
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
    handleUpdatePost(id ?? postData.articleId, { title: event.target.value })
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
            src={postData.image ?? ""}
            isReadOnly={false}
            onUpdate={(updatedData: Partial<Article>) => handleUpdatePost(id ?? postData.articleId, updatedData)}
          />
        </EmptyCard>
        <div className="flex-[2_1_auto]">
          <textarea className="w-full px-1 mt-4 overflow-hidden text-2xl font-semibold outline-none resize-none"
            value={postData.title}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleUpdateTitle(e)}
            placeholder="Tiêu đề" spellCheck={false} ref={titleRef} rows={1} />
          <h2 className="mt-4 italic">
            By <input className="px-1 text-lg italic font-bold outline-none"
              value={String(postData.miscAuthor)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpdatePost(id ?? postData.articleId, { miscAuthor: e.target.value })}
              placeholder="Tác giả" spellCheck={false} />
          </h2>
          {/* : <h2 className="mt-4 italic">By <span className="text-lg font-bold">{postData.author}</span></h2>} */}
          {/* {additionalInfo} */}
          {/* {actionBar} */}
          <GlowingButton content="Đăng bài viết" className="mt-8 bg-[#E1DCC5]" onClick={handleSubmitPost} />
        </div>
        <EmptyCard className="flex-1">

        </EmptyCard>
      </section >
      <div className="grid grid-cols-5">
        <section className="w-full col-span-3">
          <div className="flex flex-col items-start justify-center gap-8 ml-16 h-fit">
            {draftCards.map((draftCard: IdeaCard, idx) => {
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
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard(IdeaCardType.Text)}>
                <Text size={32} />
                <span>Thẻ ký tự mới</span>
              </button>
            </div>
            <div className="flex-1 h-24 bg-red-100 w-36">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard(IdeaCardType.Image)}>
                <ImagePlus size={32} />
                <span>Thẻ hình ảnh mới</span>
              </button>
            </div>
            <div className="flex-1 h-24 bg-red-100 w-36 rounded-br-2xl rounded-tr-2xl">
              <button className="flex flex-col items-center justify-center w-full h-full " onClick={() => handleAddCard(IdeaCardType.Quote)}>
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
