import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  transition: all 0.25s;
  :hover {
    transform: scale(1.05) translateZ(0);
  }
  .post {
    &-image {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 83.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      /* opacity: 0.6; */
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;

const PostFeatureItem = ({ data }) => {
  const { image, title, slug, category, user } = data;

  const date = new Date(data?.createdAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data || !data.id) return null;
  function getLastName(name) {
    if (!name) return "User";
    const length = name.split(" ").length;
    return name.split(" ")[length - 1];
  }
  return (
    <PostFeatureItemStyles>
      <PostImage url={image} alt="unsplash"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            to={slugify(user?.username || "", { lower: true })}
            date={formatDate}
            authorName={getLastName(user?.fullname)}
          ></PostMeta>
        </div>
        <PostTitle size="big" to={slug}>
          {title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;

export const MovieCartSkeleton = () => {
  return (
    <div className="text-white rounded-lg select-none  bg-slate-800">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
    </div>
  );
};
