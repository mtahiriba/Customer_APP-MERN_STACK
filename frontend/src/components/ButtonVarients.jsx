import React from "react";

const ButtonVariants = ({handler, type="success", width, children}) => {
  return (
    <button
      className={`${type.toLocaleLowerCase() === "success" && "bg-green-500"} 
        ${type.toLocaleLowerCase() === "danger" && "bg-red-500"}
        ${type.toLocaleLowerCase() === "primary" && "bg-blue-500"}
        text-white border shadow-md rounded-md py-2 px-5 ${width}`}
      onClick={handler}
    >
      {children}
    </button>
  );
};

export default ButtonVariants;
