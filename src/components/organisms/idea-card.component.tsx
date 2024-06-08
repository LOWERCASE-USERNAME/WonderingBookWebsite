
import React from "react";

interface IdeaCardProps {
  children?: React.ReactNode;
}

const data = [
  "Clutter is costly – Cal Newport is not just talking about physical clutter.You want to avoid cluttering your time and attention with too many devices, apps and services.If you do not reduce this clutter, your small benefits will diminish.",
  "Optimization is essential – To extract maximal benefit from the technology you use, you must think carefully about how and why you are using it.Always aim to optimize how you are using this technology.",
  "Intentionality is satisfying – Becoming a digital minimalist means that you gain satisfaction from intentionally engaging with new technologies."
]

export function IdeaCard({ children }: IdeaCardProps) {
  return (
    <>
      <div className="mx-6 my-8 bg-white w-[400px] h-fit rounded-2xl">
        <img className="object-cover w-full h-40 rounded-t-2xl" src="https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <div className="px-8 py-6">
          <div className="mb-4 text-lg font-bold">
            The Principles of Digital Minimalism
          </div>
          <div>
            <ol className="flex flex-col gap-3 pl-4 leading-loose list-decimal">
              {data.map((item, index) => {
                return <li key={index} className="text-xs text-gray-700">{item}</li>
              })}
            </ol>
          </div>

        </div>
      </div >
      {children}
    </>
  );
}
