import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  function handleClick() {
    onClick && onClick();
    setShow(false);
  }
  return (
    <div
      className="z-10 flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
