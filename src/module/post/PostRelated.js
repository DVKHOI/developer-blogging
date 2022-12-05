import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Heading from "../../components/layout/Heading";
import { database } from "../../firebase/firebase-config";
import PostItem from "./PostItem";

const PostRelated = ({ categoryId = "" }) => {
  // console.log(
  //   "🚀 ~ file: PostRelated.js:10 ~ PostRelated ~ categoryId",
  //   categoryId
  // );
  // console.log(categoryId === "oTkQnzlvdVDYkD2y326S");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // if (!categoryId) return;
    const docRef = query(
      collection(database, "posts"),
      where("category.id", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPosts(results);
    });
  }, [categoryId]);
  if (!categoryId || posts.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="row">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="col-lg-3 col-md-6 col-sm-12">
              <PostItem data={post}></PostItem>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostRelated;
