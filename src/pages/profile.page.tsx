import Navigation from "../components/navigations/navigation";
import React from "react";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { EmptyCard } from "../components/basic/empty-card.component";
import { ChevronRight, History, TicketPercent } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  const { userInfo, setUserInfo } = useFetchUserInfo();

  return (
    <>
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      <div className="flex flex-col gap-8 px-60">
        <EmptyCard className="block bg-[#F4EBE0] drop-shadow-lg">
          <span className="text-gray-800">Gói của bạn đang sử dụng</span>
          <h1 className="mt-2 text-4xl">Moodbook Free</h1>
          <span className="text-sm italic">Nâng cấp gói để trải nghiệm tốt hơn thôi</span>
          <Link
            to="premium"
            className="block px-6 py-2 mt-12 text-white bg-pink-400 rounded-full hover:bg-pink-500 ring-pink-400 w-fit">
            Mua Premier ngay
          </Link>
          <Outlet />
        </EmptyCard>

        <EmptyCard className="bg-[#F4EBE0] drop-shadow-lg items-start gap-2">
          <h1 className="mt-2 mb-2 text-3xl">Thanh toán</h1>
          <button className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <History className="w-5 h-5" />
              <span>Lịch sử thanh toán</span>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto" />
          </button>
          <button className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <TicketPercent className="w-5 h-5" />
              <span>Mã voucher</span>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto" />
          </button>
        </EmptyCard>
      </div>

    </>
  );
}
