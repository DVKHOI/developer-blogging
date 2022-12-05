import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import CategoryAddnew from "./module/category/CategoryAddNew";
import CategoryManage from "./module/category/CategoryManage";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostAddNew from "./module/post/PostAddNew";
import PostManage from "./module/post/PostManage";
import PostUpdate from "./module/post/PostUpdate";
import UserAddNew from "./module/user/UserAddNew";
import UserManage from "./module/user/UserManage";
import UserProfile from "./module/user/UserProfile";
import CategoryPage from "./pages/CategoryPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import PostDetailsPage from "./pages/PostDetailsPage";
import ResgiterPage from "./pages/ResgiterPage";

// const HomePage = React.lazy(() => import("./pages/HomePage"));
// const CategoryAddNew = React.lazy(() =>
//   import("./module/category/CategoryAddNew")
// );
// const CategoryManage = React.lazy(() =>
//   import("./module/category/CategoryManage")
// );
// const DashboardLayout = React.lazy(() =>
//   import("./module/dashboard/DashboardLayout")
// );
// const PostAddNew = React.lazy(() => import("./module/post/PostAddNew"));
// const PostManage = React.lazy(() => import("./module/post/PostManage"));
// const PostUpdate = React.lazy(() => import("./module/post/PostUpdate"));
// const UserAddNew = React.lazy(() => import("./module/user/UserAddNew"));
// const UserManage = React.lazy(() => import("./module/user/UserManage"));
// const UserProfile = React.lazy(() => import("./module/user/UserProfile"));
// const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
// const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
// const LoginPage = React.lazy(() => import("./pages/LoginPage"));
// const PageNotFound = React.lazy(() => import("./pages/PageNotFound"));
// const PostDetailsPage = React.lazy(() => import("./pages/PostDetailsPage"));
// const ResgiterPage = React.lazy(() => import("./pages/ResgiterPage"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/resgiter" element={<ResgiterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/post"
                element={<PostManage></PostManage>}
              ></Route>
              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddnew></CategoryAddnew>}
              ></Route>

              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/profile"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
