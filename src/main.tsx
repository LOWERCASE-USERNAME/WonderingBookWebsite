import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import ErrorBoundary from "./routes/errors/error.jsx";
import Error404 from "./routes/errors/error404.tsx";
import { BookCard } from "./components/complex/cards/book/book-card.component.tsx";
import PostDetail from "./pages/post-detail.page.tsx";
// import Contact, {loader as contactLoader} from "./routes/contact";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorBoundary />} />
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
