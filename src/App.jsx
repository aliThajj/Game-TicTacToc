import React, { useState, useRef, useEffect } from "react";
import Dashboard from "./assets/Components/Dashboard/Dashboard";
import Board from "./assets/Components/Board/Board";
import Status from "./assets/components/Status";
import RestartButton from "./assets/components/RestartButton";
import Logo from "./assets/Components/Logo";
import Dialog from "./assets/Components/Dialog";
import { calculateWinner } from "./assets/utils/CalculateWinner";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState('O'); // By Default Player is 'O'
  const opponentSymbolRef = useRef('X'); // By Default AI is 'X'
  const [aiThinking, setAiThinking] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [isGameStart, setGameStart] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  useEffect(() => {
    localStorage.setItem('playerSymbol', playerSymbol);   // Update local storage whenever the state changes
    if (winnerInfo) { // Check The Result
      setIsDialogOpen(true);
    }
  }, [playerSymbol, winnerInfo]);

  // ### Choose Symbol Function
  function ChooseSymbol(symbol) {
    console.log("### Choosing Symbol Debug");
    localStorage.clear();
    setPlayerSymbol(symbol);
    opponentSymbolRef.current = symbol === "X" ? "O" : "X";
    console.log('player symbol is :' + symbol)
    console.log('opponent sybmol is :' + opponentSymbolRef.current)
  };

  // ### Start Game Function
  function startGame() {
    if (playerSymbol && opponentSymbolRef.current) {
      console.log("### Start Game Debug")
      localStorage.setItem('savedPlayerSymbol', playerSymbol);
      localStorage.setItem('savedOpponentSymbol', opponentSymbolRef.current);
      setGameStart(true);
      console.log('savedPlayerSymbol:' + localStorage.getItem('savedPlayerSymbol'));
      console.log('savedOpponentSymbol:' + localStorage.getItem('savedOpponentSymbol'));
    }
    else {
      setGameStart(false);
      return;
    }
  }

  // ### Restart Game function
  function handleRestart() {
    console.log("### Restart Game Debug");
    if (isDialogOpen) {
      setIsDialogOpen(false)
    }
    setBoard(Array(9).fill(null));
    setPlayerSymbol(localStorage.getItem('savedPlayerSymbol'));
    opponentSymbolRef.current = localStorage.getItem('savedOpponentSymbol');
    // opponentSymbolRef.current === "X" ? "O" : "X";
    console.log('Restart => player symbol is :' + playerSymbol)
    console.log('Restart => opponent sybmol is :' + opponentSymbolRef.current)
    setAiThinking(false);
    setWinnerInfo(null);

  };

  // ### Reset Game function
  function handleReset() {
    console.log("### Reset Game Debug");
    localStorage.clear();
    setGameStart(false);
    setBoard(Array(9).fill(null));
    setWinnerInfo(null);
    setAiThinking(false);
    setPlayerSymbol("O"); // By Default Player is 'O'
    opponentSymbolRef.current = 'X' // By Default AI is 'X'
    console.log('Reset => player symbol is :' + playerSymbol)
    console.log('Reset => opponent sybmol is :' + opponentSymbolRef.current)
  }

  // ### Player Move function
  function handleClick(index) {
    if (!playerSymbol || board[index] || winnerInfo) return; // Prevent moves if the game is over

    // Human move (always X)
    const newBoard = [...board];
    // newBoard[index] = "X";
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    setAiThinking(true);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinnerInfo(result); // Set winner and winning line
      return;
    }

    // AI move (always O)
    const aiMove = getAIMove(newBoard);
    if (aiMove !== null) {
      setTimeout(() => {
        const updatedBoard = [...newBoard];
        // updatedBoard[aiMove] = "O";
        updatedBoard[aiMove] = opponentSymbolRef.current;
        setBoard(updatedBoard);
        setAiThinking(false);

        const aiResult = calculateWinner(updatedBoard);
        if (aiResult) {
          setWinnerInfo(aiResult); // Set winner and winning line
        }
      }, 1200); // Simulate AI "thinking"
    }
  };

  // ### AI Move Function
  function getAIMove(board) {
    const minimax = (board, depth, isMaximizing, alpha, beta) => {
      const result = calculateWinner(board);

      // Use dynamic symbols
      if (result?.winner === opponentSymbolRef.current) return 10 - depth; // AI wins
      if (result?.winner === playerSymbol) return depth - 10; // Player wins
      if (board.every((cell) => cell !== null)) return 0; // Draw

      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = opponentSymbolRef.current; // AI's symbol
            const score = minimax(newBoard, depth + 1, false, alpha, beta);
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) break;
          }
        }
        return bestScore;
      } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = playerSymbol; // Player's symbol
            const score = minimax(newBoard, depth + 1, true, alpha, beta);
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) break;
          }
        }
        return bestScore;
      }
    };


    let bestMove = null;
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = opponentSymbolRef.current; // Use AI's symbol
        const score = minimax(newBoard, 0, false, -Infinity, Infinity);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  // ### Draw Logic
  const isDraw = board.every((square) => square !== null);

  // ### Close Dialog Function
  function closeDialog() {
    setIsDialogOpen(false);
  };



  return <>
    <section className="game">
      <div className="board-holder mx-3 lg:w-2/6 md:w-9/12 w-11/12">
        {!isGameStart ?
          <Dashboard playerSymbol={playerSymbol} onChoose={ChooseSymbol} >
            <button className="bg-yellow-400 hover:bg-yellow-300 w-full h-12 font-bold text-primary" onClick={startGame}>START GAME</button>
          </Dashboard>
          :
          <div className="flex flex-col items-center justify-center w-full">
            <div className="board-header flex flex-row justify-between items-center gap-6 w-full">
              <Logo onReset={handleReset} />
              <Status
                winner={winnerInfo?.winner}
                // winner={winnerInfo}
                isDraw={isDraw}
                aiThink={aiThinking}
                playerSymbol={playerSymbol}
                winnerInfo={winnerInfo}
              />
              <RestartButton onRestart={handleRestart} />
            </div>
            <Board className={`w-full "basis-1/4" fade-element ${isGameStart ? 'fade-in' : 'fade-out'}`}
              board={board}
              onClick={handleClick}
              aiThink={aiThinking}
              winningLine={winnerInfo?.winningLine}
              playerSymbol={playerSymbol}

            />
          </div>
        }
      </div>
    </section>
    <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
      <h2 className="text-base mb-4 text-center text-secondary">
        {winnerInfo?.winner === playerSymbol ? " CONGRAT, YOU WIN..." : "OH NO, YOU LOST..."}
      </h2>

      <div className={`lg:text-4xl sm:text-3xl font-bold mb-4 text-center flex justify-center items-center sm:gap-2 gap-4 ${winnerInfo?.winner === 'X' ? 'text-teal-500' : 'text-yellow-500'}`}>
        <span className="lg:text-5xl sm:text-3xl">{winnerInfo?.winner}</span>
        <span>TAKES THE ROUND</span>
      </div>

      <div className=" flex justify-center items-center gap-4">
        <button onClick={closeDialog} className="close-modal hover:bg-white lg:text-4xl sm:text-2xl">Close</button>
        <button onClick={handleRestart} className="play-again hover:bg-yellow-300 lg:text-4xl sm:text-2xl">Repeat</button>
      </div>
    </Dialog>
  </>;
}
export default App;
