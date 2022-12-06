import React from "react";
import anh from "../../image/anh.jpg";
export const Footer = () => {
  return (
    <div className="w-full container-fuild bg-slate-200 ">
      <div className="w-full row">
        <div className="pt-3 text-center col-lg-7">
          <h3 className="font-bold ">
            Advanced patterns for Frontend developers.
          </h3>
          <p className="font-medium ">
            Improve your technical skills with in-depth explanations, practical
            advices and useful tips and tricks.
          </p>
          <span className="text-sm text-gray-400">
            Techstack: React, Typescript, node, monorepos, yarn, webpack, etc.
          </span>
          <div className="mx-auto mt-2 d-block input gap-x-3">
            <input
              type="text"
              placeholder="First name"
              className="p-2 mr-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Email address"
              className="p-2 mr-2 rounded-lg"
            />
            <button className="p-2 font-semibold bg-transparent border rounded-lg border-slate-800">
              Subscribe
            </button>
          </div>
          <span className="text-sm text-gray-400">
            Get the latest content by email. No spam, ever.
          </span>
        </div>
        <div className="gap-3 col-lg-2 d-flex justify-content-center align-items-center">
          <i className="cursor-pointer text-stone-900 bi bi-facebook fs-1"></i>
          <i className="cursor-pointer text-stone-900 bi bi-twitter fs-1"></i>
          <i className="cursor-pointer text-stone-900 bi bi-linkedin fs-1"></i>
          <i className="cursor-pointer text-stone-800 bi bi-github fs-1"></i>
        </div>
        <div className="!px-[50px] pt-3 col-lg-3 text-lg-end text-center">
          <div className="d-flex justify-content-lg-end justify-content-center avatar">
            <img
              src={anh}
              alt=""
              className="w-[100px] h-[100px] rounded-full mb-2"
            />
          </div>

          <h5>G'day, I'm Vinh Khoi</h5>
          <h6>Frontend Architect, coder</h6>
        </div>
      </div>
    </div>
  );
};
