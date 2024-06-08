import { QuoteCard } from "./components/organisms/quote-card.component";
import Header from "./routes/components/Navigation";

function App() {
  return (
    <div className="container mx-auto">
      {/* <Header /> */}
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <QuoteCard data={{
          author: "Me",
          imageSrc: "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          readCounter: 203,
          saveCounter: 1920,
          text: "Hello world. I love you all. Spread the positivity!!!"
        }} />
      </div>
    </div >
  );
}

export default App;
