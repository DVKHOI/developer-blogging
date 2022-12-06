import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button";
import Heading from "../../components/layout/Heading";
import { database } from "../../firebase/firebase-config";
import PostNewestLarge, { NewwesItemSkeleton } from "../post/PostNewestLarge";

const HomeNewestStyles = styled.div``;
const POST_PER_PAGE = 6;
const HomeNewest = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const isLoading = posts.length <= 0;
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(database, "posts");
      const queries = query(
        colRef,
        where("status", "==", 1),
        where("hot", "==", false),
        limit(POST_PER_PAGE)
      );
      const documentSnapshots = await getDocs(queries);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      onSnapshot(queries, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
      const q = query(
        colRef,
        where("status", "==", 1),
        where("hot", "==", false)
      );
      onSnapshot(q, (snapshot) => {
        setTotal(snapshot.size);
      });
    }
    fetchData();
  }, []);
  const handleLoadmorePost = async () => {
    const nextRef = query(
      collection(database, "posts"),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts([...posts, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
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
                  className="gap-3 mb-5 col-lg-4 col-md-6 col-sm-12"
                >
                  <PostNewestLarge
                    key={post.id}
                    className=""
                    data={post}
                  ></PostNewestLarge>
                </div>
              ))}
          </div>
        )}
        {total > posts.length && (
          <div className="mt-10">
            <Button onClick={handleLoadmorePost} className="mx-auto">
              Load more
            </Button>
          </div>
        )}
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;
