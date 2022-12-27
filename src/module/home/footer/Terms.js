import React from "react";
import Layout from "../../../components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="mt-[120px] max-w-[1000px] mx-auto leading-[32px] text-xl mb-[120px] p-6">
        <h2 className="text-[40px] font-medium text-[#08090d] mb-[48px] leading-[48px]">
          Terms of use
        </h2>
        <p className="!my-5">
          The website is here for everyone to use free of charge or advertising.
          It's okay to use the information here for any personal or work-related
          purpose, as long as the ownership of the articles is preserved. Always
          provide links the original and the author 😉
        </p>
        <h6 className="text-2xl font-medium mt-[48px] mb-6">
          Can I use those articles for...
        </h6>
        <p className="!my-5">
          It's not okay to use the articles from this website as a primary
          source of commercial gain.
        </p>
        <p className="!my-5">
          You're creating a course on React and want to reference or quote an
          article? Go for it. 👍🏼 Just link the original and the author.
          Somewhere where it's visible if possible, little promo for a great
          free resource wouldn't hurt 😉.
        </p>
        <p className="!my-5">
          You're creating a course on React and want to reference or quote an
          article? Go for it. 👍🏼 Just link the original and the author.
          Somewhere where it's visible if possible, little promo for a great
          free resource wouldn't hurt 😉.
        </p>
        <p className="!my-5">
          If there is a need to get in touch, here is the email:{" "}
          blog@developerway.com
        </p>
      </div>
    </Layout>
  );
};

export default Terms;
