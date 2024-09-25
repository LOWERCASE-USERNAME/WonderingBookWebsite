'use client'

import { Flower } from "lucide-react";
import Navigation from "../components/navigations/navigation";
import { HorizontalScrollable } from "../components/scrollable/horizontal-scrollable.component";
import Footer from "../components/navigations/footer";
import { useEffect, useState } from "react";
import { getCurrentUser, getUserIdFromToken } from "../services/authService";
import axios from "axios";

interface Props {
  params: {
    id: string;
  };
}

export default function Home({ params }: Props) {
  const { id } = params;
  const [userInfo, setUserInfo] = useState();
  const fav = ["", "", "", "", "", ""];

  useEffect(() => {
    (async () => {
      const userId = getUserIdFromToken();

      if (userId) {
        console.log(localStorage.getItem('user-token'))
        try {
          const response = await axios.get(`https://localhost:7213/api/User/home/${userId}`, {
            headers: {
              Authorization: `Bearer ${getCurrentUser()}`, // Pass the token in headers
            },
          });

          setUserInfo(response.data.userInfo);
          console.log(response.data);
        } catch (error) {
          console.error('Failed to fetch user info: ', error);
        }

      }
    })();
  }, []);

  return (
    <>
      <Navigation />
      {/* Banner */}
      {userInfo ? (
        <h1>Hello, {userInfo.fullname}!</h1> // Customize based on your User model
      ) : (
        <p>Loading...</p>
      )}
      <section className="h-[60vh] bg-[#f9f4ef] grid grid-cols-2 divide-x-2 divide-gray-800 border-b-2 border-b-gray-800">
        <div className="flex flex-col content-start justify-center h-full gap-4 p-4 mx-auto whitespace-pre-line">
          <p className="text-5xl tracking-wide">
            Đọc không giới hạn. <br /> <hr className="invisible h-4" />
            Thử ngay với các gói <span className="italic">Premium</span> ưu đãi!<br />
            <small className="text-lg tracking-normal">Chỉ từ 200k, bạn sẽ sở hữu hàng ngàn ưu đãi đi kèm</small>
          </p>
          <button className="px-12 py-2 font-sans text-lg font-semibold tracking-widest text-white rounded-full bg-rose-300 w-fit">Xem ngay!</button>
        </div>
        <div className="p-4 bg-gray-300"></div>
      </section >
      {/* Welcome text */}
      <section className="flex flex-col items-center py-32 ">
        <Flower size={36} color="#e283be" />
        <blockquote className="w-2/3 mx-auto text-4xl font-semibold leading-normal text-center">
          Chào mừng đến với "MOODBOOK" - nền tảng tóm tắt sách, podcast, và audiobook hàng đầu Việt Nam.<br />
          Tiếp cận kiến thức nhanh chóng và hiệu quả. <br />
          Khám phá ngay!
        </blockquote>
        <button className="px-8 py-2 my-8 font-sans text-lg font-semibold tracking-widest border-2 border-black rounded-full w-fit">Xem ngay!</button>
      </section>
      <hr className="mb-24 border-t-2 border-gray-800" />
      <section className="p-4">
        <div className="relative">
          <h2 className="mb-4 text-3xl">Một số loại sách yêu thích</h2>
          <button className="absolute bottom-0 font-semibold underline right-4 underline-offset-2">Xem thêm</button>
        </div>
        <HorizontalScrollable className="flex overflow-x-auto gap-x-8 cursor-grab active:cursor-grabbing" defaultScrollAmount={300}>
          {fav.map((_, idx) =>
            <div
              key={idx}
              className="relative cursor-auto grid h-[400px] flex-[0_0_300px] w-full max-w-[300px] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 select-none">
              <div
                className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1521123845560-14093637aa7d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                <div className="absolute bottom-0 w-full h-2/3 to-bg-black-10 bg-gradient-to-t from-black/100 via-black/80"></div>
              </div>
              <div className="relative">
                <div className="flex items-end ml-4">
                  <img alt="Tran Hoang Giang"
                    src="https://images.unsplash.com/photo-1591605555749-d25cfd47e981?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="relative inline-block h-6 w-6 !rounded-full border-2 border-white object-cover object-center" />
                  <h5 className="inline-block ml-2 font-sans antialiased font-light leading-snug tracking-tight text-gray-200 cursor-pointer">
                    - Tran Hoang Giang
                  </h5>
                </div>

                <h3 className="cursor-pointer block m-4 mt-2 mb-0 text-xl font-sans font-medium leading-[1.1] tracking-normal text-white antialiased text-left">
                  10 Essays that will Change the way you think - Arianna Wiest
                </h3>
                <div className="p-2 text-sm font-thin text-right text-slate-200">
                  8 ideas - 1.35k reads
                </div>
              </div>
            </div>
          )}
        </HorizontalScrollable>
      </section>
      <hr className="h-px mt-24 border-t-2 border-gray-800" />
      <section className="grid grid-cols-2 bg-indigo-50">
        <div></div>
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

      <section className="py-64 bg-pink-950">
        <HorizontalScrollable
          className="flex overflow-x-hidden gap-x-8 snap-x snap-mandatory pr-[15.4px]"
          defaultScrollAmount={document.documentElement.clientWidth}
          isHideArrows={false}
          isWrapAround={true}
        >
          {fav.map((_, idx) =>
            <div
              key={idx}
              className="flex-[0_0_100vw] snap-center pr-[15.4px]">
              <blockquote className="block w-2/3 m-auto text-2xl italic tracking-wide text-center text-white select-none">
                "Mỗi bản tóm tắt là một cánh cửa mở ra tri thức vô tận" + {idx + 1}
              </blockquote>
            </div>
          )}
        </HorizontalScrollable>
      </section >
      <Footer />
    </>
  );
}
