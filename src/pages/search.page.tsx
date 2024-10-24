import Navigation from "../components/navigations/navigation";
import React, { useEffect, useState } from "react";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { Article } from "../types/article";
import { getArticles, getArticlesByBook, getArticlesByBookId } from "../services/articleService";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { dateFormat } from "../lib/utils";
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookId = searchParams.get("bookid");
  const query = searchParams.get("query");
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let result: Article[] = [];
      if (bookId) {
        result = await getArticlesByBookId(bookId);
      } else if (query) {
        result = await getArticlesByBook(query);
      } else {
        result = []
      }
      setPosts(result);
    }

    fetchPosts();
  }, [bookId, query]);

  return (
    <>
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2 col-start-1 gap-4 ml-24 mr-24">
          <strong className="text-3xl leading-10">Tìm kiếm: </strong>
          {posts.map((post, idx) =>
            <Link
              to={`/detail/${post.articleId}`}
              state={post}
              key={idx}
              className="relative cursor-auto select-none"
            >
              <article className="flex w-full h-64 transition border-2 border-black rounded-lg shadow hover:shadow-lg">
                <div className="justify-center flex-1">
                  <img
                    src={post.image ?? "default_post_image.png"}
                    className="object-contain w-full h-full p-4 bg-white"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = "/image_not_found.png"; // Fallback image
                    }}
                  />
                </div>
                <div className="p-4 bg-white sm:p-6 flex-[2_2_0] flex flex-col">
                  <time dateTime="2022-10-10" className="block text-xs text-gray-500">{"Tạo ngày: " + dateFormat(post.dateCreated)}</time>
                  <h2 className="mt-0.5 text-xl text-gray-900">{post.title} - {post.miscAuthor}</h2>
                  <p className="mt-2 text-gray-500 line-clamp-3 text-sm/relaxed">
                    {post.curatorNote}
                  </p>
                  <div className="p-2 mt-auto text-sm font-light text-right">
                    <span>8 ideas</span> - <span>1.35k reads</span>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>
        <aside className="col-start-3 mr-24"></aside>
      </div>

    </>
  );
}
