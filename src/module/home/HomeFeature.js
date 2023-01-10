import Heading from "../../components/layout/Heading";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostFeatureItem, { FeatureItemSkeleton } from "../post/PostFeatureItem";
import { useSelector } from "react-redux";
const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  const listPosts = useSelector((state) => state.postsRedux.posts);

  const isLoading = posts.length <= 0;
  useEffect(() => {
    document.title =
      "Developer way: improve your technical skills with in-depth explanations, practical advices and useful tips and tricks.";
    const results = listPosts.filter((post) => post.hot === true);
    setPosts(results);
  }, [listPosts]);
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
