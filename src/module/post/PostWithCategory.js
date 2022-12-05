import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { database } from "../../firebase/firebase-config";
import PostNewestLarge from "./PostNewestLarge";

const PostWithCategory = ({ params = "" }) => {
  const [postCategory, setPostCategory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const queries = query(
        collection(database, "posts"),
        where("category.slug", "==", params)
      );
      onSnapshot(queries, (snapsot) => {
        let result = [];
        snapsot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostCategory(result);
      });
    }
    fetchData();
  }, [params]);
  return (
    <>
      {postCategory.length > 0 &&
        postCategory.map((post) => (
          <div key={post.id} className="col-xl-4 col-lg-6 col-sm-12">
            <PostNewestLarge data={post}></PostNewestLarge>
          </div>
        ))}
    </>
  );
};

export default PostWithCategory;
