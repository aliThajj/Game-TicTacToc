import React from "react";
import { VscDebugRestart } from "react-icons/vsc";

export default function RestartButton({ onRestart }) {
  return (
    <button className="restart-button lg:text-3xl sm:text-2xl hover:bg-white" onClick={onRestart}>
      <VscDebugRestart/>
    </button>
  );
};
