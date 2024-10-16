import Navigation from "../components/navigations/navigation";
import React, { useEffect, useState } from "react";
import { useFetchUserInfo } from "../hooks/useFetchUserInfo";
import { UpperRoundedLargeImage } from "../components/basic/upper-rounded-large-image.component";

const people = [
  {
    name: "Đặng Trần Hiếu",
    imageUrl: "abstract_pink.png",
    role: "Mentor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel felis at ipsum pellentesque maximus. Sed vel felis at ipsum pellentesque maximus.",
  },
  {
    name: "Nguyễn Thùy Dương",
    imageUrl: "abstract_pink.png",
    role: "CEO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel felis at ipsum pellentesque maximus. Sed vel felis at ipsum pellentesque maximus.",
  },
  {
    name: "Trần Đức Hùng",
    imageUrl: "abstract_pink.png",
    role: "CRO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel felis at ipsum pellentesque maximus. Sed vel felis at ipsum pellentesque maximus.",
  },
  {
    name: "Trần Hoàng Giang",
    imageUrl: "abstract_pink.png",
    role: "CTO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel felis at ipsum pellentesque maximus. Sed vel felis at ipsum pellentesque maximus.",
  },
  {
    name: "Nguyễn Phúc Thịnh",
    imageUrl: "abstract_pink.png",
    role: "CDO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel felis at ipsum pellentesque maximus. Sed vel felis at ipsum pellentesque maximus.",
  },
  {
    name: "Trần Đức Nghĩa",
    imageUrl: "abstract_pink.png",
    role: "CFO",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel felis at ipsum pellentesque maximus. Sed vel felis at ipsum pellentesque maximus.",
  },
];

export default function AboutUs() {
  const { userInfo, setUserInfo } = useFetchUserInfo();

  return (
    <>
      <Navigation userInfo={userInfo} setUserInfo={setUserInfo} />
      <h2 className="mt-12 font-sans text-3xl font-bold leading-loose tracking-tight text-center text-gray-900 sm:text-4xl">Đội ngũ của chúng tôi</h2>
      <div className="px-8 py-12 ">
        {/* <div className="grid grid-cols-3 px-6 mx-auto max-w-7xl gap-x-8 gap-y-20 lg:px-8"> */}
        <ul role="list" className="grid grid-cols-3 cols-start-1 gap-x-8 gap-y-12">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex flex-col w-full gap-x-6">
                <UpperRoundedLargeImage src={person.imageUrl} className="w-full min-w-0 rounded-xl" />
                <div className="pl-4 mt-6">
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  {/* <p className="mt-2 font-sans text-sm">{person.description}</p> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* </div> */}
    </>
  );
}
