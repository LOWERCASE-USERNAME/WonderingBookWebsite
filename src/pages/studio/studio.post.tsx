import { SquarePlus, ChevronRight, BookText, Trash2, EllipsisVertical } from "lucide-react";
import { EmptyCard } from "../../components/basic/empty-card.component";
import Navigation from "../../components/navigations/navigation";
import { IdeaCardData } from "../../types/IdeaCardData";
import { useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { PostData } from "../../types/PostData";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getArticlesByUserId, postArticle, putArticle } from "../../services/articleService";
import { getUserIdFromToken, getUserInfo } from "../../services/authService";
import { RoundedImage } from "../../components/basic/rounded-image.component";
import DropdownMenu from "../../components/complex/inputs/dropdown-menu.component";
import { useFetchUserInfo } from "../../hooks/useFetchUserInfo";

interface Props {
  params: {
    id: string;
  };
}

const sources = [
  {
    "label": "Bài viết mới",
    "description": "Mẫu bài viết trống, thỏa sức sáng tạo",
    "icon": <SquarePlus size={28} />,
    "state": {}
  },
  {
    "label": "Nguồn sách",
    "description": "Bạn lấy cảm hứng từ các cuốn sách",
    "icon": <BookText size={28} />,
    "state": {}
  }
];

export default function Studio({ params }: Props) {
  const { id } = params;
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [draftPosts, setDraftPosts] = useState<PostData[]>([]);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const userId = getUserIdFromToken();
  //     if (userId) {
  //       const response = await getUserInfo(userId);
  //       setUserInfo(response);
  //     }
  //   }
  //   fetchUserInfo();
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.id) {
        const response = await getArticlesByUserId(userInfo?.id);
        setDraftPosts(response);
      }
    }

    fetchData();
  }, [userInfo])

  const handleAddPost = async (source) => {
    try {
      const response = await postArticle({
        userId: userInfo?.id,
        title: "",
      });

      console.log(response);
      if (response != null) {
        navigate("/write", { state: {} });
      }
    } catch (error) {
      console.error("Failed to create post", error);
    }
  }

  const handleDeleteCard = async (id: string) => {
  };

  const handleUpdatePost = async (postData: PostData) => {
    navigate("/write", {
      state: {
        ...postData,
        author: postData.miscAuthor
      }
    });
  };

  return (
    <div className="container flex flex-col gap-6">
      <nav className="h-12">
        <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      </nav>
      <section className="flex flex-col p-4 bg-white">
        <div className="select-none">
          <h1 className="text-5xl tracking-wide">Tạo bài viết mới với MoodBook Studio</h1>
          <h2 className="mt-2 text-2xl italic">Bắt đầu bằng một mẫu trống không hoặc chọn từ nguồn có sẵn</h2>
        </div>

      </section>
      <div className="grid grid-cols-5">
        <section className="w-full col-span-3">
          <div className="grid grid-cols-3">
            {sources.map(source => (
              <EmptyCard className="mx-auto h-fit flex flex-col w-48 bg-[#F9F4EF] rounded-none overflow-hidden border-black group p-0 gap-0 hover:border-2"
                onClick={() => handleAddPost(source)}>
                <div className="relative w-full flex-grow-[5] group-hover:bg-red-100 duration-500 ease-in-out h-32">
                  <div className="absolute p-8 -translate-x-6 -translate-y-6 bg-red-100 rounded-full left-1 top-1">
                    {source.icon}
                  </div>
                </div>
                <div className="relative flex flex-col items-start w-full p-2 origin-top border-t-2 border-t-black">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg transition-opacity duration-200 select-none group-hover:opacity-0">{source.label}</span>
                    <ChevronRight className="transition-transform duration-200 group-hover:-translate-x-[9.5rem] group-hover:rotate-90" />
                  </div>


                  {/* Long description container */}
                  <div className="overflow-y-auto transition-all duration-300 ease-in-out max-h-0 group-hover:max-h-40">
                    <span className="block text-sm italic text-gray-700 select-none">{source.description}</span>
                  </div>
                </div>
              </EmptyCard>
            ))}

          </div>
          <div className="col-span-3 bg-blue-300">
            <h3 className="p-4 mt-12 text-xl">Các bài viết</h3>
            <div className="flex flex-col items-center justify-center gap-8 h-fit">
              {draftPosts.map((draftPost: PostData, idx) =>
                <EmptyCard className="flex flex-row justify-between w-full mb-8 rounded-none" key={idx}
                  onClick={() => handleUpdatePost(draftPost)}>
                  <RoundedImage
                    className="mx-8 rounded-xl"
                    src="/default_post_image.png"
                    isReadOnly={false}
                  />
                  <div className="flex flex-col self-start flex-1">
                    <span className="text-2xl font-semibold">{draftPost.title != "" ? draftPost.title : "Không tiêu đề"}</span>
                    <span className="mt-2 italic">By <span className="text-lg font-bold">{draftPost.author ?? "Không tác giả"}</span></span>
                    <span className="mt-6">0 idea</span>
                  </div>
                  <DropdownMenu
                    className=""
                    buttonIcon={<EllipsisVertical />} options={[{
                      label: "Delete", icon: <Trash2 />, action: (event: React.MouseEvent) => {
                        event.stopPropagation();
                        console.log("Delete " + draftPost.title)
                      }
                    }]} />
                </EmptyCard>
              )}
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
