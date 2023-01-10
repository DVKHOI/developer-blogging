import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostNewestLarge, { NewwesItemSkeleton } from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div``;
const HomeNewestTypescrip = ({ params = "" }) => {
  const [posts, setPosts] = useState([]);
  const listPosts = useSelector((state) => state.postsRedux.posts);
  const isLoading = posts.length <= 0;
  useEffect(() => {
    async function fetchData() {
      const results = listPosts.filter(
        (post) => post.category.slug === "typescrip"
      );
      setPosts(results);
    }
    fetchData();
  }, [listPosts]);

  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>List posts</Heading>
        {isLoading && (
          <div className="row">
            {Array(6)
              .fill(0)
              .map((item, index) => (
                <div
                  key={index}
                  className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12"
                >
                  <NewwesItemSkeleton></NewwesItemSkeleton>
                </div>
              ))}
          </div>
        )}
        {!isLoading && (
          <div className="row">
            {posts.length > 0 &&
              posts.map((post) => (
                <div
                  key={post.id}
                  className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12 animate__animated animate__slideInLeft"
                >
                  <PostNewestLarge
                    key={post.id}
                    className="h-full"
                    data={post}
                  ></PostNewestLarge>
                </div>
              ))}
          </div>
        )}
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewestTypescrip;
