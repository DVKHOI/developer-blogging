import Heading from "../../components/layout/Heading";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostFeatureItem, { FeatureItemSkeleton } from "../post/PostFeatureItem";
import {
  collection,
  query,
  where,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { database } from "../../firebase/firebase-config";
const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  const isLoading = posts.length <= 0;
  useEffect(() => {
    document.title =
      "Developer way: improve your technical skills with in-depth explanations, practical advices and useful tips and tricks.";
    const colRef = collection(database, "posts");
    const queris = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(4)
    );
    let result = [];
    onSnapshot(queris, (snapshot) => {
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(result);
    });
  }, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Featured post</Heading>
        {isLoading && (
          <div className="row">
            <div className="gap-3 mb-5 col-lg-3 col-md-6 col-sm-12 ">
              <FeatureItemSkeleton></FeatureItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-3 col-md-6 col-sm-12 ">
              <FeatureItemSkeleton></FeatureItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-3 col-md-6 col-sm-12 ">
              <FeatureItemSkeleton></FeatureItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-3 col-md-6 col-sm-12 ">
              <FeatureItemSkeleton></FeatureItemSkeleton>
            </div>
          </div>
        )}
        {!isLoading && (
          <div className="row">
            {posts.map((post) => (
              <div
                key={post.id}
                className="gap-3 mb-5 col-lg-3 col-md-6 col-sm-12 animate__animated animate__slideInLeft"
              >
                <PostFeatureItem data={post}></PostFeatureItem>
              </div>
            ))}
          </div>
        )}
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
