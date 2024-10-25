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
import PostDetail from "./pages/post-detail.page.tsx";
import Home from "./pages/home.page.tsx";
import { ProtectedRoute } from "./routes/protected_route.tsx";
import { Login } from "./pages/auth/login.page.tsx";
import { Register } from "./pages/auth/register.page.tsx";
import NewPost from "./pages/studio/new-post.page.tsx";
import Studio from "./pages/studio/studio.post.tsx";
import { ComingSoon } from "./routes/errors/comingSoon.tsx";
import Explore from "./pages/explore.page.tsx";
import AboutUs from "./pages/about-us.page.tsx";
import Profile from "./pages/profile.page.tsx";
import PremiumOffer from "./pages/premium-offer.page.tsx";
import { gapi } from "gapi-script";
import Search from "./pages/search.page.tsx";
import Information from "./pages/information.page.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} errorElement={<ErrorBoundary />} />
      <Route path="/register" element={<Register />} errorElement={<ErrorBoundary />} />
      {/* <Route path="/admin" element={<Admin />} />*/}
      <Route path="/home" element={<Home />} errorElement={<ErrorBoundary />} />
      <Route path="/explore" element={<Explore />} errorElement={<ErrorBoundary />} />
      <Route path="/search" element={<Search />} errorElement={<ErrorBoundary />} />
      <Route path="/community" element={<ComingSoon />} errorElement={<ErrorBoundary />} />
      <Route path="/aboutus" element={<AboutUs />} errorElement={<ErrorBoundary />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } errorElement={<ErrorBoundary />} />
      <Route path="/info" element={
        <ProtectedRoute>
          <Information />
        </ProtectedRoute>
      } errorElement={<ErrorBoundary />} />
      <Route path="/profile/premium" element={
        <ProtectedRoute>
          <PremiumOffer />
        </ProtectedRoute>
      } errorElement={<ErrorBoundary />} />
      <Route
        path="/write/:id"
        element={
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/studio"
        element={
          <ProtectedRoute>
            <Studio />
          </ProtectedRoute>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route
        path="/detail/:id"
        element={
          <ProtectedRoute>
            <PostDetail />
          </ProtectedRoute>
        }
        errorElement={<ErrorBoundary />}
      />
      <Route path="/" element={<Navigate to="/home" replace={true} />} />
      <Route path="*" element={<Error404 />} />
    </>,
  ),
);

function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "798378210108-8thhu0hg1hc7leafgetqlpvbisur36gg.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
