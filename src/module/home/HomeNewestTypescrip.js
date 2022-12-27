import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import { database } from "../../firebase/firebase-config";
import PostNewestLarge, { NewwesItemSkeleton } from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div``;
const POST_PER_PAGE = 6;
const HomeNewestTypescrip = ({ params = "" }) => {
  const [posts, setPosts] = useState([]);
  const isLoading = posts.length <= 0;
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(database, "posts");

      const queriesParams = query(
        colRef,
        where("status", "==", 1),
        where("hot", "==", false),
        where("category.slug", "==", "typescrip"),
        limit(POST_PER_PAGE)
      );

      onSnapshot(queriesParams, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params]);

  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>List posts</Heading>
        {isLoading && (
          <div className="row">
            <div className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12">
              <NewwesItemSkeleton></NewwesItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12">
              <NewwesItemSkeleton></NewwesItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12">
              <NewwesItemSkeleton></NewwesItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12">
              <NewwesItemSkeleton></NewwesItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12">
              <NewwesItemSkeleton></NewwesItemSkeleton>
            </div>
            <div className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12">
              <NewwesItemSkeleton></NewwesItemSkeleton>
            </div>
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
