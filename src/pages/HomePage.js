import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { database } from "../firebase/firebase-config";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import { fetchCategories } from "../store/slice/categorySlice";
import { fetchPosts } from "../store/slice/postSlice";
import { fetchUsers } from "../store/slice/userSlice";

const HomePageStyles = styled.div``;
const HomePage = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchPostData() {
      const colRef = collection(database, "posts");
      onSnapshot(colRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(fetchPosts(result));
      });
    }
    function fetchCategoryData() {
      const colRef = collection(database, "categories");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(fetchCategories(results));
      });
    }
    function fetchUserData() {
      const colRef = collection(database, "users");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(fetchUsers(results));
      });
    }
    fetchPostData();
    fetchCategoryData();
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <Outlet></Outlet>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
