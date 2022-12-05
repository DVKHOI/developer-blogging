import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import { database } from "../firebase/firebase-config";
import PostCategory from "../module/post/PostCategory";
import PostImage from "../module/post/PostImage";
import PageNotFound from "./PageNotFound";
import parse from "html-react-parser";
import AuthorBox from "../components/author/AuthorBox";
import PostRelated from "../module/post/PostRelated";
const PostDetailsPageStyles = styled.div`
  margin-top: 85px;
  .post {
    &-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* gap: 40px; */
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      /* max-width: 640px; */
      /* height: 466px; */
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
      margin-bottom: 10px;
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    const colRef = query(
      collection(database, "posts"),
      where("slug", "==", slug)
    );
    onSnapshot(colRef, (snapshot) => {
      snapshot.forEach((doc) => {
        doc?.data() && setPostInfo({ id: doc.id, ...doc.data() });
      });
    });
  }, [slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  if (!slug) return <PageNotFound></PageNotFound>;
  if (!postInfo.title) return null;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container mb-5">
          <div className="post-header">
            <div className="mt-2 post-info">
              <PostCategory className="mb-6" to={postInfo.category?.slug}>
                {postInfo?.category?.name}
              </PostCategory>
            </div>
            <h1 className="post-heading ">{postInfo?.title}</h1>
            <PostImage
              url={postInfo?.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info"></div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <AuthorBox userId={postInfo?.user?.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
