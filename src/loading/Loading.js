import React from "react";

const Loading = ({
  height = "100%",
  width = "100%",
  borderRadius = "8px",
  bg = "",
}) => {
  return (
    <div
      className="skeleton"
      style={{
        height: height,
        width: width,
        borderRadius: borderRadius,
        background: bg,
      }}
    ></div>
  );
};

export default Loading;
