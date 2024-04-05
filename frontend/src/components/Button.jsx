import React from "react";

const Button = ({type, disabled, handler, width, children}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`text-white bg-green-800 border shadow-md rounded-md py-2 px-5 ${width}`}
      onClick={handler}
    >
      {children}
    </button>
  );
};

export default Button;
