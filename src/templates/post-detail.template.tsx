import { EmptyCard } from "../components/basic/empty-card.component";

interface Props {
  mainContent: React.ReactElement;
  sideContent: React.ReactElement;
  navigation: React.ReactElement;
}

export default function PostDetailTemplate({ mainContent, sideContent, navigation }: Props) {
  return (
    <div className="container flex flex-col gap-6">
      <nav className="h-12">
        {navigation}
      </nav>
      <section className="flex p-4 bg-white">
        <EmptyCard>
          <img
            className="mx-8 h-28"
            src="../../../Subtle_Art_Of_Not_Giving_A_Fuck.png"
          />
        </EmptyCard>
        <div>
          <h1 className="text-2xl font-semibold">Atomic Habits</h1>
          <h2 className="italic">By James Clear</h2>
          <div className="flex items-center gap-10 mt-6">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold tracking-wide text-white bg-gray-500 rounded-3xl h-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
              </svg>
              <span>
                Publish
              </span>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-5">
        <section className="w-full col-span-3">
          {mainContent}
        </section>
        <aside className="w-full col-span-2 col-start-4">
          {sideContent}
        </aside>
      </div>
    </div>
  );
}
