import React from "react";

const Button = ({ text, onClick, className }) => {
  return (
    <button
      className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
