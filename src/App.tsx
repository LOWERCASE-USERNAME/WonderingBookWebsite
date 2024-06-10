import { QuoteCard } from "./components/organisms/quote-card.component";
import { TextCard } from "./components/organisms/text-card.component";
import Header from "./routes/components/Navigation";

function App() {
  return (
    <div className="container mx-auto">
      <Header />
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-100 h-fit">
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
    </div >
  );
}

export default App;
