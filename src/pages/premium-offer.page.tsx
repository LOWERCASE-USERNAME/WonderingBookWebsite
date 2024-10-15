import Navigation from "../components/navigations/navigation";
import React from "react";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { EmptyCard } from "../components/basic/empty-card.component";
import { ChevronRight, History, TicketPercent } from "lucide-react";

export default function PremiumOffer() {
  const { userInfo, setUserInfo } = useFetchUserInfo();
  return (
    <>
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
    </>
  )
}