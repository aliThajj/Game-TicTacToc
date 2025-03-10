// src/components/Status.jsx
import React from "react";

function Status({ winner, isDraw, aiThink }) {
  if (winner) {
    return <p className="status">Winner: {winner}</p>;
  }
  if (isDraw) {
    return <p className="status">It's a draw!</p>;
  }
  // return <p className="status">Next player: X</p>; // Human is always X
  if (aiThink) {
    return <p className="status">AI Thinking... </p>; // Human is always X
  } else return <p className="status">Your Turn: X</p>; // Human is always X
}

export default Status;