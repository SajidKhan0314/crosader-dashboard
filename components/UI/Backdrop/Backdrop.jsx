import React from "react";

const Backdrop = ({ children, onClicked = () => {} }) => {
  return (
    <div
      onClick={onClicked}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black z-40 bg-opacity-70"
    >
      {children}
    </div>
  );
};

export default Backdrop;
