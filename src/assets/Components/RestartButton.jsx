import React from "react";
export default function RestartButton({ onRestart }) {
  return (
    <button className="restart-button" onClick={onRestart}>
      Restart
    </button>
  );
};
