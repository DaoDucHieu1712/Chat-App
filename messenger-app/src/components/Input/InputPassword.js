import React, { useState } from "react";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";
import Input from "./Input";

const InputPassword = ({ control }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Input
      type={toggle ? "text" : "password"}
      control={control}
      name="password"
      placeholder="Enter your password ...."
      hasIcon
    >
      {toggle ? (
        <IconEyeClose
          className="icon-eye"
          onClick={() => setToggle(!toggle)}
        ></IconEyeClose>
      ) : (
        <IconEyeOpen
          className="icon-eye"
          onClick={() => setToggle(!toggle)}
        ></IconEyeOpen>
      )}
    </Input>
  );
};

export default InputPassword;
