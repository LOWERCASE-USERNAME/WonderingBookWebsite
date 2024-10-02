import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";

import ErrorBoundary from "./routes/errors/error.jsx";
import Error404 from "./routes/errors/error404.tsx";
import { BookCard } from "./components/complex/cards/book/book-card.component.tsx";
import PostDetail from "./pages/post-detail.page.tsx";
import Home from "./pages/home.page.tsx";
import { ProtectedRoute } from "./routes/protected_route.tsx";
import { Login } from "./pages/auth/login.page.tsx";
import { Register } from "./pages/auth/register.page.tsx";
import NewPost from "./pages/studio/new-post.page.tsx";
import Studio from "./pages/studio/studio.post.tsx";
import { ComingSoon } from "./routes/errors/comingSoon.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/admin" element={<Admin />} />*/}
      <Route path="/home" element={<Home params={{ id: "FirstIdea" }} />} errorElement={<ErrorBoundary />} />
      <Route path="/explore" element={<ComingSoon />} errorElement={<ErrorBoundary />} />
      <Route path="/aboutus" element={<ComingSoon />} errorElement={<ErrorBoundary />} />
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
          <ProtectedRoute>
            <NewPost params={{ id: "FirstIdea" }} />
          </ProtectedRoute>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/studio"
        element={
          <ProtectedRoute>
            <Studio params={{ id: "FirstIdea" }} />
          </ProtectedRoute>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/detail"
        element={
          <PostDetail params={{ id: "FirstIdea" }} />
        }
        errorElement={<ErrorBoundary />}
      />
      <Route path="/" element={<Navigate to="/home" replace={true} />} />
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
