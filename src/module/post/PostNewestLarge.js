import React from "react";
import styled from "styled-components";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestLargeStyles = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  padding: 20px;
  transition: all 0.25s;
  :hover {
    transform: translateY(-20px);
  }
  .post {
    margin-bottom: 20px;
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 239px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-title {
      margin-bottom: 12px;
    }
  }
  .info {
    display: flex;
    gap: 20px;
  }
  .avatar {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
`;

const PostNewestLarge = ({ data, className = "" }) => {
  return (
    <PostNewestLargeStyles className={className}>
      <PostImage url={data?.image} alt="unsplash"></PostImage>

      <PostTitle size="big" to={data?.slug}>
        {data?.title}
      </PostTitle>
      <PostTitle size="mini">{data?.desc?.slice(0, 100) + "..."}</PostTitle>
      <div className="info">
        <div className="avatar">
          <img src={data?.user?.avatar} alt="" />
        </div>
        <div>
          <PostCategory
            to={data?.category?.slug}
            className="p-0 "
            type="secondary"
          >
            {data?.category?.name}
          </PostCategory>
          <PostMeta
            authorName={data?.user?.fullname}
            date={new Date(
              data?.user?.createdAt?.seconds * 1000
            ).toLocaleDateString("vi-VI")}
          ></PostMeta>
        </div>
      </div>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
export const NewwesItemSkeleton = () => {
  return (
    <div className="text-white rounded-lg select-none bg-slate-800">
      <LoadingSkeleton
        width="100%"
        height="416px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
    </div>
  );
};
