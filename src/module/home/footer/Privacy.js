import React from "react";
import Layout from "../../../components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="mt-[120px] container leading-[32px] text-xl mb-5 p-6">
        <h2 className="text-[40px] font-medium text-[#08090d] mb-[48px] leading-[48px]">
          Privacy policy
        </h2>
        <p>
          The "Developer way" website itself does not collect or store any
          private personal information.
        </p>
        <p>
          It physically can't, it's a static website, just a collection of HTML
          pages. It doesn't have any backend to connect to or store anything,
          even if it wanted to. It doesn't show ads, and doesn't store any
          information in cookies either.
        </p>
        <p>
          It does, however, use a few third-party services that store some of
          the information. All the services are used only for the purpose of
          improving readers' experience on the website.
        </p>
        <h6 className="text-2xl font-medium">Email subscription</h6>
        <p>
          The website uses ConvertKit to collect user's name and email address
          in order to set up email subscription functionality. Only the website
          owner has access to this information. The information is collected
          solely for the purpose of providing blog updates to the subscribers.
          Everyone can unsubscribe at anytime. You can see ConvertKit's privacy
          policy in more detail here.
        </p>

        <h6 className="text-2xl font-medium">Comments</h6>
        <p>
          The website uses Hyvor platform for the comments section under the
          articles. They are privacy focused, don't sell information to anyone,
          no ads and GDPR compliant. It optionally collects name and email, but
          also provides anonymous comments functionality. Only the website owner
          has access to the provided information. You can see their privacy
          policy in more detail here.
        </p>
        <h6 className="text-2xl font-medium">Analytics</h6>
        <p>
          The website uses analytics to collect minimal data like page visits or
          number of clicks on some buttons. It uses Fathom analytics service for
          that, it's an alternative to google analytics that is "Privacy-focused
          without compromise". They don't use cookie and are also GDPR
          compliant. You can see their privacy policy in more detail here.
        </p>
        <p>
          If there is a need to get in touch, here is the email:
          blog@developerway.com
        </p>
      </div>
    </Layout>
  );
};

export default Privacy;
