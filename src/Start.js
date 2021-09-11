import React from "react";

const Start = ({ onHandleStart }) => {
  return (
    <div id="start">
      <button className="startBtn" onClick={onHandleStart}>
        Start
      </button>
    </div>
  );
};

export default Start;
