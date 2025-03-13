import PropTypes from "prop-types";

export default function TheStatus({ isDraw, aiThink, playerSymbol, winnerInfo }) {
  // console.log(winnerInfo)
  if (winnerInfo?.winner) {
    return <label className="status">Winner: <span className={`mx-3 uppercase ${winnerInfo.winner === "X" ? 'text-teal-500' : 'text-yellow-400'}`}>{winnerInfo.winner}</span></label>;
  }
  if (isDraw) {
    return <label className="status">It's a draw!</label>;
  }
  if (aiThink) {
    return <label className="status">AI Thinking...</label>;
  }
  if (playerSymbol) {
    return <label className="status">Your Turn <span className={`mx-3 uppercase ${playerSymbol === "X" ? 'text-teal-500' : 'text-yellow-400'}`}>{playerSymbol}</span></label>;
  }

}

// Define PropTypes
// Status.propTypes = {
//   winner: PropTypes.string, // winner should be a string
//   isDraw: PropTypes.bool, // isDraw should be a boolean
//   aiThink: PropTypes.bool, // aiThink should be a boolean
//   playerSymbol: PropTypes.string, // playerSymbol should be a string
// };

