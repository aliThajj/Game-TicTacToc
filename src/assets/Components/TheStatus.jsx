
export default function TheStatus({ isDraw, aiThink, playerSymbol, winnerInfo }) {
  // console.log(winnerInfo)
  if (winnerInfo?.winner) {
    return <div className="status">Winner: <span className={`mx-3 uppercase sm:text-3xl ${winnerInfo.winner === "X" ? 'text-teal-500' : 'text-yellow-400'}`}>{winnerInfo.winner}</span></div>;
  }
  if (isDraw) {
    return <div className="status">It's a draw!</div>;
  }
  if (aiThink) {
    return <div className="status ai">
      <p className="mb-0">AI Thinking </p>
      <div className="snippet" data-title="dot-flashing">
        <div className="stage">
          <div className="dot-flashing"></div>
        </div>
      </div>
    </div>;
  }
  if (playerSymbol) {
    return <div className="status">Your Turn <span className={`mx-3 uppercase sm:text-3xl  ${playerSymbol === "X" ? 'text-teal-500' : 'text-yellow-400'}`}>{playerSymbol}</span></div>;
  }

}



