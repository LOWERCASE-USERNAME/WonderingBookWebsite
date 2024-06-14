import { CuratorCard } from "../components/complex/cards/curator/curator-card.component";
import { QuoteCard } from "../components/complex/cards/idea/quote-card.component";
import { TextCard } from "../components/complex/cards/idea/text-card.component";
import Header from "../routes/components/Navigation";
import { EmptyCard } from "../components/basic/empty-card.component";

interface Props {
  params: {
    id: string;
  };
}

export default function PostDetail({ params }: Props) {
  const { id } = params;

  return (
    <>
      <div className="container flex flex-col gap-6">
        <nav className="h-12">
          < Header />
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
              <QuoteCard data={{
                author: "Me",
                imageSrc: "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                readCounter: 203,
                saveCounter: 1920,
                text: "Hello world. I love you all. Spread the positivity!!!"
              }} />
              <TextCard data={{
                title: "Always ahead of your peers!",
                imageSrc: "https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
                readCounter: 100,
                saveCounter: 34,
                text: `
                <b>Think about your future. Work hard. Do your best</b>. Spread the positivity!!! <br>
                <i>Think about your future. Work hard. Do your best. Spread the positivity!!! <br>
                Think about your future. Work hard. Do your best. Spread the positivity!!! <br>
                Think about your future. Work hard. Do your best. Spread the positivity!!! <br>
                Think about your future. Work hard. Do your best. Spread the positivity!!!</i> <br>
                `
              }} />
            </div>
          </section>
          <aside className="w-full col-span-2 col-start-4">
            <CuratorCard
              imageSrc="https://images.unsplash.com/photo-1631176093398-e106d8e9aa2c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="TRAN HOANG GIANG"
              identifier="@GIANGTH"
              description="Interest in the world"
              note={`One of the best books I've ever read about economics is "Capital in the Twenty-First Century" by Thomas Piketty. This monumental work delves deep into the historical evolution of wealth and income inequality. Piketty's analysis, supported by extensive data, illuminates the dynamics that drive the concentration of wealth and offers insights into how economic inequality has shaped society through different eras.

              What sets this book apart is its accessibility. While it's grounded in rigorous economic theory and empirical research, Piketty's clear and engaging writing style makes complex concepts understandable to a broad audience.
          `}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
