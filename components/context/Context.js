import React, { createContext } from "react";
export const mainContext = createContext();

const doSome = () => {
  console.log("doSome");
};

export { doSome };
