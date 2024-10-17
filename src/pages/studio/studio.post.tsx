import { SquarePlus, ChevronRight, BookText, Trash2, EllipsisVertical } from "lucide-react";
import { EmptyCard } from "../../components/basic/empty-card.component";
import Navigation from "../../components/navigations/navigation";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getArticlesByUserId, postArticle } from "../../services/articleService";
import { RoundedImage } from "../../components/basic/rounded-image.component";
import DropdownMenu from "../../components/complex/inputs/dropdown-menu.component";
import { useFetchUserInfo } from "../../hooks/useFetchUserInfo";
import { Article } from "../../types/article";
import { Modal } from "../../components/basic/modal.component";
import { GoogleBooksAutocomplete } from "../../components/complex/inputs/google-book-autocomplete.component";
import { GoogleBook } from "../../types/googleBook";
import toast from "react-hot-toast";
import useCustomToast from "../../hooks/useCustomToast";

const sources = [
  {
    "id": "empty",
    "label": "Bài viết mới",
    "description": "Mẫu bài viết trống, thỏa sức sáng tạo",
    "icon": <SquarePlus size={28} />,
    // "state": {}
  },
  {
    "id": "book",
    "label": "Nguồn sách",
    "description": "Bạn lấy cảm hứng từ các cuốn sách",
    "icon": <BookText size={28} />,
    // "state": {}
  }
];

export default function Studio() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [draftPosts, setDraftPosts] = useState<Article[]>([]);
  const [delConfirmModalOpen, setDelConfirmModalOpen] = useState(false);
  const [bookSourceModalOpen, setBookSourceModalOpen] = useState(false);
  // const [bookSource, setBookSource] = useState<object | null>(null);
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);
  const { getToaster } = useCustomToast();


  useEffect(() => {
    const fetchData = async () => {
      if (userInfo?.id) {
        const response = await getArticlesByUserId(userInfo?.id);
        setDraftPosts(response);
      }
    }

    fetchData();
  }, [userInfo])

  const handleAddPost = async (source: string) => {
    const formData = new FormData();
    formData.append("userId", userInfo?.id);

    if (source === "book") {
      if (selectedBook == null) {
        setBookSourceModalOpen(true);
        return;
      } else {
        formData.append("title", selectedBook.title);
        formData.append("miscAuthor", selectedBook.authors);
        formData.append("defaultImage", selectedBook.imageLink);
      }
    } else {
      formData.append("title", String(null));
    }

    try {

      const response = await postArticle(formData);

      if (response != null) {
        navigate(`/write/${response.articleId}`, { state: response });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Lỗi chưa dự kiến đã xảy ra', { duration: 10000 });
      }
    }
  }

  const handleDeleteCard = async (id: string) => {
  };

  const handleUpdatePost = async (postData: Article) => {
    navigate(`/write/${postData.articleId}`, {
      state: {
        ...postData,
        author: postData.miscAuthor
      }
    });
  };

  return (
    <div className="container flex flex-col gap-6">
      {getToaster()}
      <nav className="h-12">
        <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      </nav>
      <section className="flex flex-col p-4">
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
                onClick={() => handleAddPost(source.id)}>
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
          <div className="col-span-3">
            <h3 className="p-4 mt-12 text-xl">Các bài viết</h3>
            <div className="flex flex-col items-center justify-center h-fit">
              {draftPosts.map((draftPost: Article, idx) =>
                <EmptyCard className="flex flex-row justify-between w-full mb-8 border-2 border-black rounded-none" key={idx}
                  onClick={() => handleUpdatePost(draftPost)}>
                  <RoundedImage
                    className="mx-8 rounded-xl"
                    src={draftPost.image ?? "/default_post_image.png"}
                    isReadOnly={false}
                  />
                  <div className="flex flex-col self-start flex-1">
                    <span className="text-2xl font-semibold">{draftPost.title != "" ? draftPost.title : "Không tiêu đề"}</span>
                    <span className="mt-2 italic">By <span className="text-lg font-bold">{draftPost.miscAuthor ?? "Không tác giả"}</span></span>
                    <span className="mt-6">0 idea</span>
                  </div>
                  <DropdownMenu
                    className=""
                    buttonIcon={<EllipsisVertical />} options={[{
                      label: "Delete", icon: <Trash2 />, action: (event: React.MouseEvent) => {
                        event.stopPropagation();
                        setDelConfirmModalOpen(true);
                        // console.log("Delete " + draftPost.title)
                      }
                    }]} />
                </EmptyCard>
              )}
            </div>
          </div>


        </section>
        <aside className="flex justify-center w-full col-span-2 col-start-4">
          <EmptyCard className="w-2/3 bg-orange-100 h-fit">
            <h2>Hành trình sáng tác của bạn bắt đầu từ đây</h2>
            <p>Nếu bạn muốn bắt đầu tóm tắt từ một cuốn sách đã xuất bản, hãy thử tìm kiếm với "Nguồn sách". Nếu không, hãy tạo một mẫu trống với "Bài viết mới"</p>
          </EmptyCard>
        </aside>
      </div >
      <Modal
        open={delConfirmModalOpen}
        cancelFn={() => setDelConfirmModalOpen(false)}
        primaryFn={() => {
          alert(" You deleted everything");
          setDelConfirmModalOpen(false);
        }}
        variant="danger"
      />

      <Modal
        open={bookSourceModalOpen}
        titleString="Nguồn sách"
        contentNode={
          <div className="my-4">
            <GoogleBooksAutocomplete handleBookChange={(newBook) => setSelectedBook(newBook)} className="" />
            {selectedBook &&
              <div className="mt-4">
                <div className="flex gap-4">
                  <img className="w-36" src={selectedBook.imageLink} />
                  <div className="flex flex-col gap-2">
                    <p>ISBN: {selectedBook.isbn}</p>
                    <p>Title: {selectedBook.title}</p>
                    <p>Authors: {selectedBook.authors}</p>
                    <p>Publisher: {selectedBook.publisher}</p>
                    <p>PublishedDate: {selectedBook.publishedDate}</p>
                    <p>PageCount: {selectedBook.pageCount}</p>
                  </div>
                </div>
                <p className="mt-4 line-clamp-6" >Description: {selectedBook.description}</p>
              </div>
            }
          </div>
        }
        cancelFn={() => {
          setSelectedBook(null);
          setBookSourceModalOpen(false)
        }}
        primaryFn={() => {
          setBookSourceModalOpen(false);
          handleAddPost("book");
        }}
        size="lg"
      />
    </div >
  );
}
