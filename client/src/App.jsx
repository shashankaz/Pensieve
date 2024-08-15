import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
const BlogPage = lazy(() => import("./pages/BlogPage"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Layout = ({ children }) => {
  const location = useLocation();

  const hideNavbarFooter =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {children}
      {!hideNavbarFooter && <Footer />}
      <ScrollToTop />
    </>
  );
};

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Router>
          <Layout>
            <Routes>
              {user ? (
                <Route path="/" element={<Feed />} />
              ) : (
                <Route path="/" element={<Home />} />
              )}
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
