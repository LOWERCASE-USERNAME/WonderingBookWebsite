import Navigation from "../components/navigations/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { EmptyCard } from "../components/basic/empty-card.component";
import { ChevronLeft, ChevronRight, History, TicketPercent } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PremiumOffer() {
  const { userInfo, setUserInfo } = useFetchUserInfo();
  const [amount, setAmount] = useState<number>(40000);
  const [transactionUrl, setTransactionUrl] = useState<string>("https://img.vietqr.io/image/970422-2709200383333-compact2.png?amount=40000&addInfo=INVBYQ20241015154423&accountName=MOODBOOK");
  useEffect(() => {
    const fetchTransactionInfo = async () => {
      const formData = new FormData();
      formData.append('userId', userInfo.id);
      formData.append('amount', amount.toString());
      const response = await axios.postForm(`/FinacialTransaction`, formData);
      setTransactionUrl(response.data);
    }
    // fetchTransactionInfo();
  }, [userInfo, amount]);

  console.log(userInfo)
  return (
    <>
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      <div>
        <Link
          to={"/profile"}
          className="flex items-center gap-2 ml-4"
        ><ChevronLeft className="w-5 h-5" /> <h3 className="text-xl">Quay về hồ sơ</h3></Link>
      </div>
      <div className="px-[500px] mt-4">
        <h1 className="mb-2 text-3xl">Thanh toán</h1>
        <EmptyCard className="">
          <img src={transactionUrl} className="w-96" />
        </EmptyCard>
      </div>
    </>
  )
}