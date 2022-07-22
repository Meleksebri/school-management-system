import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ReactLoading
        type="spinningBubbles"
        color="#0000FF"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loading;
