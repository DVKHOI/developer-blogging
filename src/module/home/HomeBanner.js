import React from "react";
import styled from "styled-components";
import Button from "../../components/button/Button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-top: 86px;
  margin-bottom: 60px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
    &-image {
      display: block;
      margin: 0 auto;
    }
    &-buttons {
      transition: all 1s;
    }
    &-button:hover {
    }
  }
  @media screen and (max-width: 1200px) {
    .banner-image {
      width: 350px;
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="row">
          <div className="order-2 pt-3 text-center text-lg-start col-xl-6 col-md-12 order-lg-1 pt-lg-0">
            <div className="banner-content">
              <h1 className="banner-heading animate__animated animate__backInDown">
                Developer way blogging
              </h1>
              <p className="banner-desc animate__animated animate__backInLeft">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium magnam similique accusantium natus esse facilis!
                Quaerat voluptates possimus dolorem officiis pariatur, repellat,
                cupiditate porro, quidem molestiae impedit laudantium neque quo!
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
                perferendis non quae mollitia omnis illum placeat! Porro amet
                qui vitae error veniam, deserunt facere tempora. Vel doloribus
                saepe qui molestias.
              </p>
              <Button
                to="/resgiter"
                kind="secondary"
                className="banner-button animate__animated animate__backInUp"
              >
                Get started
              </Button>
            </div>
          </div>
          <div className="order-1 col-xl-6 col-md-12 order-lg-2">
            <div>
              <img
                src="/banner.png"
                alt="banner"
                className="banner-image animate__animated animate__backInRight"
              />
            </div>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
