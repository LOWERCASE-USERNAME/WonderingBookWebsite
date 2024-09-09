import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";

import ErrorBoundary from "./routes/errors/error.jsx";
import Error404 from "./routes/errors/error404.tsx";
import { BookCard } from "./components/complex/cards/book/book-card.component.tsx";
import PostDetail from "./pages/post-detail.page.tsx";
import Home from "./pages/home.page.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<Home params={{ id: "FirstIdea" }} />} errorElement={<ErrorBoundary />} />
      <Route
        path="/card"
        element={
          <>
            <BookCard />
          </>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/write"
        element={
          <>
          </>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/detail"
        element={
          <>
            <PostDetail params={{ id: "FirstIdea" }} />
          </>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route path="*" element={<Error404 />} />
    </>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
