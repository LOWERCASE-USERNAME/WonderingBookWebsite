import { EmptyCard } from "../components/basic/empty-card.component";
import Navigation from "../routes/components/Navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function NewPost({ params }: Props) {
  const { id } = params;
  const draftIdeaCards: any[] = [];

  return (
    <>
      <div className="container flex flex-col gap-6">
        <nav className="h-12">
          <Navigation />
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
            <h2 className="italic">By <span className="text-lg font-bold">James Clear</span></h2>
            {/* {additionalInfo} */}
            {/* {actionBar} */}
          </div>
        </section>
        <div className="grid grid-cols-5">
          <section className="w-full col-span-3">
            <div className="flex flex-col items-center justify-center gap-8 h-fit">
              {draftIdeaCards.map(() => <>
                {/* map over the draft card that is store in the database */}
              </>)}
            </div>
          </section>
          <aside className="w-full col-span-2 col-start-4">
            {/* {sideContent} */}
          </aside>
        </div>
      </div>
    </>
  );
}
