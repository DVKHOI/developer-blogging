import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div className="w-full pt-3 text-center container-fuild bg-slate-200">
      <h2>Advanced patterns for Frontend developers.</h2>
      <p className="">
        Improve your technical skills with in-depth explanations, practical
        advices and useful tips and tricks.
      </p>
      <div className="mb-3 d-flex justify-content-center align-items-center gap-x-4">
        <i className="cursor-pointer text-stone-900 bi bi-facebook fs-1"></i>
        <i className="cursor-pointer text-stone-900 bi bi-twitter fs-1"></i>
        <i className="cursor-pointer text-stone-900 bi bi-linkedin fs-1"></i>
        <i className="cursor-pointer text-stone-800 bi bi-github fs-1"></i>
      </div>
      <div className="flex items-center justify-between p-3 bg-slate-400">
        <div className="text-lg font-normal">Copyright ⓒ2022 Developer Way</div>
        <div className="flex text-lg font-normal gap-x-3">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </div>
  );
};
