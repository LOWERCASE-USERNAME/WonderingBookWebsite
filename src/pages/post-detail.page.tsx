import { CuratorCard } from "../components/complex/cards/curator/curator-card.component";
import { QuoteCard } from "../components/complex/cards/idea/quote-card.component";
import { TextCard } from "../components/complex/cards/idea/text-card.component";
import Navigation from "../components/navigations/navigation";
import { ImageCard } from "../components/complex/cards/idea/image-card.component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { getIdeaCardsByArticleId } from "../services/ideaCardService";
import { useEffect, useState } from "react";
import { IdeaCard } from "../types/ideaCard";
import { IdeaCardType } from "../types/ideaCardType";
import { PostImageCard } from "../components/complex/cards/post/post-image-card.component";
import { TableOfContentCard } from "../components/complex/cards/TOC/table-of-content-card.component";
import { Bookmark, MessageCircle, Share2 } from "lucide-react";
import { getArticle } from "../services/articleService";
import { Article } from "../types/article";

export default function PostDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const [postData, setPostData] = useState<Article>(state);
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [ideaCards, setIdeaCards] = useState<IdeaCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (state) {
      window.scrollTo(0, 0);
    }

    const fetchData = async () => {
      if (postData == null) {
        const response: Article = await getArticle(id);
        setPostData(response);
      }

      const response2: IdeaCard[] = await getIdeaCardsByArticleId(id);
      setIdeaCards(response2.sort((a, b) => Number(a.order) - Number(b.order)) ?? []);
      setLoading(false);
    }

    fetchData();
  }, [id])

  const handleRenderCard = (card: IdeaCard, index: number) => {
    switch (card.cardType) {
      case IdeaCardType.Text:
        return (
          <TextCard data={card} isReadOnly={true} key={index} id={"card-" + index} />
        );
      case IdeaCardType.Image:
        return (
          <ImageCard data={card} isReadOnly={true} key={index} id={"card-" + index} />
        );
      case IdeaCardType.Quote:
        return (
          <QuoteCard data={card} isReadOnly={true} key={index} id={"card-" + index} />
        );
      default:
        return null;
    }
  }

  return (
    <>
      {!loading && <div className="container flex flex-col gap-6">
        <nav className="h-12">
          <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
        </nav>
        <section className="flex p-4 mt-8 ">
          <PostImageCard imageSrc={postData.image ?? ""} className="ml-12" />
          <div className="mt-4 ml-4">
            <h1 className="text-2xl font-semibold">{postData.title}</h1>
            <h2 className="italic">By <span className="text-lg font-bold">{postData.miscAuthor}</span></h2>
            {/* {additionalInfo} */}
            {/* {actionBar} */}
            <div className="flex gap-2 mt-12">
              <button className="flex flex-col items-center w-16">
                <Share2 />
                <span className="text-sm">Chia sẻ</span>
              </button>
              <button className="flex flex-col items-center w-16">
                <Bookmark />
                <span className="text-sm">Lưu</span>
              </button>
              <button className="flex flex-col items-center w-16">
                <MessageCircle />
                <span className="text-sm">Bình luận</span>
              </button>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-6">
          <aside className="">
            <TableOfContentCard lsContent={ideaCards.map((card, idx) => ({ id: `card-${idx}`, title: card.title }))} />
          </aside>
          <section className="w-full col-span-3">
            <div className="flex flex-col items-center justify-center gap-8 h-fit">
              {ideaCards.map((card, idx) => handleRenderCard(card, idx))}
            </div>
            <div className="h-96"></div>
          </section>
          <aside className="col-span-2 col-start-5">
            <CuratorCard
              className="bg-transparent"
              imageSrc="/default_user_icon.svg"
              name={userInfo.fullname}
              identifier={"@" + userInfo.userName}
              description="Interest in the world"
              note={postData.curatorNote}
            />
          </aside>
        </div>
      </div>
      }
    </>
  );
}
