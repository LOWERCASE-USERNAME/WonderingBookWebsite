'use client'

import { CircleX, Flower, SquareCheck } from "lucide-react";
import Navigation from "../components/navigations/navigation";
import { HorizontalScrollable } from "../components/scrollable/horizontal-scrollable.component";
import Footer from "../components/navigations/footer";
import React, { useEffect, useState } from "react";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { Article } from "../types/article";
import { getArticles } from "../services/articleService";
import { Link } from "react-router-dom";
import { dateFormat } from "../lib/utils";
import ChatbotComponent from "../components/complex/cards/chatbot/chatbot";

export default function Home() {
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [isOpenBot, setIsOpenBot] = useState(false);
  const [quotes, setQuotes] = useState<object[]>(Array(10).fill({ content: "", author: "" }));
  const [posts, setPosts] = useState<Article[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const zenquotes_url = "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/quotes/";

      const storedQuotes = localStorage.getItem('quotes');
      if (storedQuotes) {
        setQuotes(JSON.parse(storedQuotes));
      } else {
        const response = await fetch(zenquotes_url);
        const data = await response.json();

        const newQuotes = data.map((quote: { q: string; a: string }) => ({
          content: quote.q,
          author: quote.a
        }));

        localStorage.setItem('quotes', JSON.stringify(newQuotes));

        setQuotes(newQuotes);
      }
    };

    const fetchPosts = async () => {
      const response = await getArticles();
      setPosts(response);
    }

    const toggleMontlyPayment = () => {
      const priceElement = document.getElementById("PriceDisplay");
      const timespanElement = document.getElementById("TimeSpanDisplay");
      if (document.getElementById('MonthlyToggle')?.checked) {
        priceElement!.innerHTML = "40.000 VNĐ"
        timespanElement!.innerHTML = "/tháng";
      } else {
        priceElement!.innerHTML = "2.000 VNĐ"
        timespanElement!.innerHTML = "/ngày";
      }
    }

    fetchQuotes();
    fetchPosts();
    document.getElementById("MonthlyToggle")!.onchange = toggleMontlyPayment;
  }, []);

  const toggleBot = () => {
    setIsOpenBot(prevState => !prevState);
  }

  return (
    <>
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className="fixed bottom-0 right-0 z-[999] w-96">
        <div className="relative">
          {!isOpenBot ?
            <div onClick={() => toggleBot()} className="m-6 w-16 h-16 bg-white rounded-full z-[1000] flex justify-center items-center shadow-lg cursor-pointer absolute right-0 bottom-0">
              <img src="/moodbook_logo.png" className="w-10 h-8" />
            </div>
            :
            <>
              <div
                onClick={() => toggleBot()}
                className="absolute top-0 right-0 m-2 cursor-pointer z-[1000] "
              >
                <CircleX color="gray" className="" />
              </div>
              <ChatbotComponent isOpenBot={isOpenBot} />
            </>
          }
        </div>

        {/* <ChatbotComponent isOpenBot={isOpenBot} /> */}
      </div>
      <section className="h-96 bg-[#f9f4ef] grid grid-cols-2 divide-x-2 divide-gray-800 border-y-2 border-y-gray-800">
        <div className="flex flex-col content-start justify-center gap-4 p-4 mx-auto whitespace-pre-line">
          <p className="text-5xl tracking-wide select-none">
            Đọc không giới hạn. <br /> <hr className="invisible h-4" />
            Thử ngay với các gói <span className="italic">Premium</span> ưu đãi!<br />
            <small className="text-lg tracking-normal">Chỉ từ 40k, bạn sẽ sở hữu hàng ngàn ưu đãi đi kèm</small>
          </p>
          <button className="px-12 py-2 font-sans text-lg font-semibold tracking-widest text-white rounded-full bg-rose-300 w-fit">Xem ngay!</button>
        </div>
        <div className="h-full p-4 bg-gray-300 bg-[url('/dip-devices.jpg')] bg-cover" >
        </div>
      </section >
      {/* Welcome text */}
      <section className="flex flex-col items-center py-32 bg-[#EDDFE0]">
        <Flower size={36} color="#e283be" />
        <blockquote className="w-2/3 mx-auto text-4xl font-semibold leading-normal text-center select-none">
          Chào mừng đến với "MOODBOOK" - nền tảng tóm tắt sách, podcast, và audiobook hàng đầu Việt Nam.<br />
          Tiếp cận kiến thức nhanh chóng và hiệu quả. <br />
          Khám phá ngay!
        </blockquote>
        <button className="px-8 py-2 my-8 font-sans text-lg font-semibold tracking-widest border-2 border-black rounded-full w-fit">Xem ngay!</button>
      </section>
      <hr className="border-t-2 border-gray-800" />
      <section className="p-4 pt-24 pb-24 bg-white">
        <div className="relative">
          <h2 className="mb-4 text-3xl">Các bài tóm tắt nổi bật</h2>
          <button className="absolute bottom-0 font-semibold underline right-4 underline-offset-2">Xem thêm</button>
        </div>
        <HorizontalScrollable className="flex overflow-x-hidden gap-x-8 cursor-grab active:cursor-grabbing" defaultScrollAmount={350}>
          {posts.map((post, idx) =>
            <Link
              to={`/detail/${post.articleId}`}
              state={post}
              key={idx}
              className="relative flex-[0_0_fit-content] w-fit max-w-[400px] bg-white cursor-auto select-none"
            >
              <article className="overflow-hidden transition border-2 border-black rounded-lg shadow hover:shadow-lg">
                <div className="flex justify-center">
                  <img
                    src={post.image ?? "default_post_image.png"}
                    className="object-cover h-56 w-fit"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = "image_not_found.png"; // Fallback image
                    }}
                  />
                </div>
                <div className="p-4 bg-white sm:p-6">
                  <time dateTime="2022-10-10" className="block text-xs text-gray-500">{"Tạo ngày: " + dateFormat(post.dateCreated)}</time>
                  <h2 className="mt-0.5 text-xl text-gray-900">{post.title} - {post.miscAuthor}</h2>
                  <p className="mt-2 text-gray-500 line-clamp-3 text-sm/relaxed">
                    {post.curatorNote}
                  </p>
                  <div className="p-2 text-xs font-light text-right">
                    <span>8 ideas</span> - <span>1.35k reads</span>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </HorizontalScrollable>
      </section >
      <hr className="h-px border-t-2 border-gray-800" />
      <section className="grid grid-cols-2 bg-indigo-50">
        <div className="p-20">
          <div className="w-2/3 h-full rounded-full">
            <img
              src="library.png" className="w-full h-full rounded-full" />
          </div>
        </div>
        <div className="flex flex-col py-32">
          <blockquote className="w-4/5">
            <h4 className="font-sans text-base font-semibold">MOODBOOK - NGƯỜI ĐỒNG HÀNH CÙNG BẠN</h4>
            <h3 className="my-4 text-5xl">Xin chào !</h3>
            <p className="font-sans text-base">
              Có vẻ bạn đang gặp vấn đề khi đọc sách? Xin chào! Tôi là Al, người
              bạn đồng hành đáng tin cậy của bạn trên trang web tóm tắt sách.
              Tôi ở đây để giúp bạn giải quyết mọi thắc mắc và vấn đề khi sử
              dụng trang web. Với khả năng phân tích và hiểu biết sâu rộng, tôi sẽ
              giúp bạn tìm thấy những thông tin hữu ích, chia sẻ những cuốn
              sách hay và lằng nghe tâm sự của bạn. Hãy để tôi giúp bạn khám
              phá thế giới sách một cách dễ dàng và thú vị nhất. Cùng nhau,
              chúng ta sẽ tận hưởng niềm vui đọc sách và học hỏi mỗi ngày!
            </p>
          </blockquote>
          <button className="px-8 py-2 my-8 font-sans font-semibold tracking-widest border-2 border-black rounded-full w-fit">Xem thêm</button>
        </div>
      </section>
      <hr className="h-px border-t-2 border-gray-800" />
      <section className="py-64 bg-[#664343]">
        <HorizontalScrollable
          className="flex overflow-x-hidden gap-x-8 snap-x snap-mandatory pr-[15.4px]"
          defaultScrollAmount={document.documentElement.clientWidth}
          isHideArrows={false}
          isWrapAround={true}
        >
          {quotes.map((quote, idx) =>
            <div
              key={idx}
              className="flex-[0_0_100vw] flex-col gap-4 snap-center pr-[15.4px]">
              <blockquote className="block w-2/3 m-auto text-3xl italic tracking-wide text-center text-white select-none">
                <div className="flex flex-col gap-4">
                  <span>{quote.content}</span>
                  <span className="text-xl">---{quote.author}---</span>
                </div>

              </blockquote>
            </div>
          )}
        </HorizontalScrollable>
      </section >
      <hr className="h-px border-t-2 border-gray-800" />
      <div className="flex gap-12 px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold leading-relaxed tracking-wider text-gray-900">
            Khai phá tri thức,<br /> tối ưu thời gian
          </h2>
          <h3 className="font-semibold text-gray-700 leading-[30px] tracking-wide">
            <span className="leading-[36px] text-lg tracking-wider">Nâng tầm trải nghiệm đọc với gói Premium!</span>
            <span className="block mt-4 font-sans">
              Truy cập kho tàng tóm tắt sách không giới hạn, tạo ghi chú cá nhân, và lưu trữ ý tưởng của riêng bạn. Đừng bỏ lỡ cơ hội khai phá kiến thức với những tính năng độc quyền chỉ dành riêng cho hội viên Premium.
            </span>
          </h3>
        </div>
        <div className="flex-[4_4_0] grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          <div className="p-6 border border-gray-200 shadow-sm rounded-2xl sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Thông thường
                <span className="sr-only">Gói</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> Miễn phí </strong>

                {/* <span className="text-sm font-medium text-gray-700">/month</span> */}
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> 5 bài đọc / ngày </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Gợi ý nội dung phù hợp nhất với người dùng </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Khám phá nội dung mới mẻ, được đề xuất </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Thư viện giúp dễ dàng tìm lại được các ý tưởng đã đọc </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Cộng đồng người đọc </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Gợi ý nội dung bằng AI </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Tạo bài tóm tắt mới dễ dàng với Moodbook Studio </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> FAQ và trung tâm trợ giúp người dùng </span>
              </li>
            </ul>

            {/* <a
              href="#"
              className="block px-12 py-3 mt-8 text-sm font-medium text-center text-indigo-600 bg-white border border-indigo-600 rounded-full hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
            >
              Get Started
            </a> */}
          </div>

          <div
            className="p-6 border border-indigo-600 shadow-sm rounded-2xl ring-1 ring-indigo-600 sm:px-8 lg:p-12"
          >
            <div className="flex items-center justify-center gap-2">
              <span>Theo ngày</span>
              <label
                htmlFor="MonthlyToggle"
                className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-indigo-500"
              >
                <input type="checkbox" id="MonthlyToggle" className="sr-only peer" defaultChecked={true} />

                <span
                  className="absolute inset-y-0 m-1 transition-all bg-white rounded-full start-0 size-6 peer-checked:start-6"
                ></span>
              </label>
              <span className="relative">Theo tháng <span className="absolute text-green-700">(-33%)</span></span>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Premium
                <span className="sr-only">Gói</span>
              </h2>
              <p className="mt-2 sm:mt-4">
                <strong id="PriceDisplay" className="text-3xl font-bold text-gray-900 sm:text-4xl"> 40.000 VNĐ </strong>

                <span id="TimeSpanDisplay" className="text-sm font-medium text-gray-700">/tháng</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Không giới hạn số bài đọc / ngày </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Lưu trữ các thẻ ý tưởng thành nhóm với Stash </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Ghi chú mọi lúc mọi nơi </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Lướt nội dung không quảng cáo </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Nghe bài tóm tắt thay vì đọc với công nghệ TTS </span>
              </li>
              <li className="flex items-center gap-1">
                <SquareCheck className="text-indigo-700" />
                <span className="text-gray-700"> Hỗ trợ trực tuyến với người sáng tạo nội dung </span>
              </li>
            </ul>

            <a
              href="#"
              className="block px-12 py-3 mt-8 text-sm font-medium text-center text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
            >
              Get Started
            </a>
          </div>


        </div>
      </div>
      <hr className="h-px border-t-2 border-gray-800" />
      <Footer />
    </>
  );
}
