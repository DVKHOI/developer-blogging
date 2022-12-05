import { collection, onSnapshot } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebase-config";
import styled from "styled-components";

const DashboardStyles = styled.div`
  .icon {
    transition: all 0.25s;
  }
  .dashboard-content:hover {
    .icon {
      transform: scale(1.05) translateZ(0);
    }
  }
`;
const DashboardPage = () => {
  const nagivate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    function fetchPost() {
      const colRef = collection(database, "posts");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    function fetchCategory() {
      const colRef = collection(database, "categories");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategories(results);
      });
    }
    function fetchUser() {
      const colRef = collection(database, "users");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUsers(results);
      });
    }
    fetchPost();
    fetchCategory();
    fetchUser();
    document.title = "Dashboard";
  }, []);
  return (
    <DashboardStyles>
      <h1 className="mb-5 dashboard-heading">Dashboard page</h1>
      <div className=" row">
        <div className="col-lg-4 ">
          <div className=" w-full border border-blue-500 h-[150px] bg-[#17a2b8] rounded-lg relative dashboard-content">
            <p className="absolute text-3xl font-semibold text-white top-3 left-3">
              {posts.length}
            </p>
            <p className="absolute text-xl font-semibold text-white top-14 left-3">
              New post
            </p>
            <p className="absolute font-semibold text-white top-5 right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-14 h-14 icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            </p>
            <button
              className="absolute font-semibold text-white bottom-0 left-[50%] -translate-x-[50%] w-full h-[32px] bg-[#1591a5]"
              onClick={() => nagivate("/manage/post")}
            >
              More info
            </button>
          </div>
        </div>
        <div className="col-lg-4">
          <div className=" w-full border border-blue-500 h-[150px] bg-[#28a745] rounded-lg relative dashboard-content">
            <p className="absolute text-3xl font-semibold text-white top-3 left-3">
              {categories.length}
            </p>
            <p className="absolute text-xl font-semibold text-white top-14 left-3">
              Category
            </p>
            <p className="absolute font-semibold text-white top-5 right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-14 h-14 icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </p>
            <button
              className="absolute font-semibold text-white bottom-0 left-[50%] -translate-x-[50%] w-full h-[32px] bg-[#24963e]"
              onClick={() => nagivate("/manage/category")}
            >
              More info
            </button>
          </div>
        </div>
        <div className="col-lg-4">
          <div className=" w-full border border-blue-500 h-[150px] bg-[#ffc107] rounded-lg relative dashboard-content">
            <p className="absolute text-3xl font-semibold text-white top-3 left-3">
              {users.length}
            </p>
            <p className="absolute text-xl font-semibold text-white top-14 left-3">
              User
            </p>
            <p className="absolute font-semibold text-white top-5 right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-14 h-14 icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </p>
            <button
              className="absolute font-semibold text-white bottom-0 left-[50%] -translate-x-[50%] w-full h-[32px] bg-[#e5ad06]"
              onClick={() => nagivate("/manage/user")}
            >
              More info
            </button>
          </div>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardPage;
