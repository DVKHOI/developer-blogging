import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const ToggleInputPassword = ({ control }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <Fragment>
      <Input
        type={showPass ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {!showPass ? (
          <IconEyeClose onClick={() => setShowPass(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setShowPass(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default ToggleInputPassword;
