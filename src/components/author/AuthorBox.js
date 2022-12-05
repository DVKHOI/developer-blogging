import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { database } from "../../firebase/firebase-config";
import PostMeta from "../../module/post/PostMeta";

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(database, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);
  if (!userId) return null;
  return (
    <div className="author">
      <div className="author-image">
        <img src={user?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname}</h3>
        <p className="author-desc">
          {user?.description?.slice(0, 150) + " ..."}
        </p>
        <PostMeta
          authorName={user?.username}
          date={new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
            "vi-VI"
          )}
        ></PostMeta>
      </div>
    </div>
  );
};

export default AuthorBox;
