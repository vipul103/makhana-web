import React from "react";

type ErrorType = {
  msg: string;
};

const ErrorMsg = ({ msg }: ErrorType) => {
  return <div style={{ color: "red" }}>{msg}</div>;
};

export default ErrorMsg;
