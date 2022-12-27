import React from "react";
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
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import HomeNewest from "./module/home/HomeNewest";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import PostDetailsPage from "./pages/PostDetailsPage";
import ResgiterPage from "./pages/ResgiterPage";
import HomeNewestReact from "./module/home/HomeNewestReact";
import HomeNewestTypescrip from "./module/home/HomeNewestTypescrip";
import HomeNewestPerformance from "./module/home/HomeNewestPerformance";
import HomeNewestRenders from "./module/home/HomeNewestRenders";
import HomeNewestComposition from "./module/home/HomeNewestComposition";
import Privacy from "./module/home/footer/Privacy";
import Terms from "./module/home/footer/Terms";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route element={<HomePage />}>
            <Route path="/" element={<HomeNewest></HomeNewest>}></Route>
            <Route
              path="/category/react"
              element={<HomeNewestReact></HomeNewestReact>}
            ></Route>
            <Route
              path="/category/typescrip"
              element={<HomeNewestTypescrip></HomeNewestTypescrip>}
            ></Route>
            <Route
              path="/category/performance"
              element={<HomeNewestPerformance></HomeNewestPerformance>}
            ></Route>
            <Route
              path="/category/re-renders"
              element={<HomeNewestRenders></HomeNewestRenders>}
            ></Route>
            <Route
              path="/category/composition"
              element={<HomeNewestComposition></HomeNewestComposition>}
            ></Route>
          </Route>
          <Route path="/resgiter" element={<ResgiterPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route path="/privacy" element={<Privacy></Privacy>}></Route>
          <Route path="/terms" element={<Terms></Terms>}></Route>

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
      </AuthProvider>
    </div>
  );
}

export default App;
