import Navigation from "../components/navigations/navigation";
import React, { useEffect, useState } from "react";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { EmptyCard } from "../components/basic/empty-card.component";
import { ChevronRight, History, TicketPercent, Wallet as LucideWallet } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { Wallet } from "../types/wallet";
import { formatVND } from "../lib/utils";

export default function Profile() {
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [personalWallet, setPersonalWallet] = useState<Wallet | null>(null)
  useEffect(() => {
    const fetchWallet = async () => {
      const response = await axios.get(`FinacialTransaction/get-personal-wallet?userId=${userInfo.id}`);
      setPersonalWallet(response.data);
    }
    fetchWallet();
  }, [userInfo])

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
          <div className="flex items-end justify-between w-full mb-2">
            <h1 className="mt-2 mb-2 text-3xl">Thanh toán</h1>
            <div className="flex gap-2 mb-1">
              <span className="inline-flex gap-1">
                <LucideWallet />
                Số dư:
              </span>
              <span>{formatVND(personalWallet?.balance ?? 0)}</span>
            </div>
          </div>


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
