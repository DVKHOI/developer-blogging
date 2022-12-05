import React from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import PostWithCategory from "../module/post/PostWithCategory";

const CategoryPage = () => {
  const params = useParams();

  return (
    <Layout>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <div className="container">
        <Heading>Danh muc {params.slug}</Heading>
        <div className="mb-5  row">
          <PostWithCategory params={params.slug}></PostWithCategory>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
