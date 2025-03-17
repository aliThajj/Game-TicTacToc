import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "./assets/Components/Dashboard/Dashboard";
import Board from "./assets/Components/Board/Board";
import TheStatus from "./assets/components/TheStatus.jsx";
import RestartButton from "./assets/components/RestartButton";
import Logo from "./assets/Components/Logo";
import Dialog from "./assets/Components/Dialog";
import { calculateWinner } from "./assets/utils/CalculateWinner";

function App() {
  // Single state object to manage all game-related state
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    playerSymbol: "O", // By default, player is 'O'
    opponentSymbol: "X", // By default, AI is 'X'
    aiThinking: false,
    winnerInfo: null,
    isGameStart: false,
    isDialogOpen: false,
    difficulty: "easy", // Default to easy difficulty
  });

  // Effect to handle winner dialog and draw condition
  useEffect(() => {
    const isDraw = gameState.board.every((square) => square !== null);
    if (gameState.winnerInfo || isDraw) {
      setGameState((prevState) => ({
        ...prevState,
        isDialogOpen: true,
      }));
    }
  }, [gameState.winnerInfo, gameState.board]);

  // ### Helper Functions

  // Save symbols to localStorage
  const saveSymbolsToLocalStorage = (playerSymbol, opponentSymbol) => {
    localStorage.setItem("savedPlayerSymbol", playerSymbol);
    localStorage.setItem("savedOpponentSymbol", opponentSymbol);
  };

  // Restore symbols from localStorage or use fallback
  const restoreSymbols = () => {
    return {
      playerSymbol:
        localStorage.getItem("savedPlayerSymbol") || gameState.playerSymbol,
      opponentSymbol:
        localStorage.getItem("savedOpponentSymbol") || gameState.opponentSymbol,
    };
  };

  // ### Event Handlers

  // Handle symbol selection
  const handleSymbolSelection = useCallback((symbol) => {
    console.log("### Choosing Symbol Debug");
    localStorage.clear();
    setGameState((prevState) => ({
      ...prevState,
      playerSymbol: symbol,
      opponentSymbol: symbol === "X" ? "O" : "X",
    }));
    console.log("Player symbol is:", symbol);
    console.log("Opponent symbol is:", symbol === "X" ? "O" : "X");
  }, []);

  // Start the game
  const startGame = useCallback(() => {
    if (gameState.playerSymbol && gameState.opponentSymbol) {
      console.log("### Start Game Debug");
      saveSymbolsToLocalStorage(gameState.playerSymbol, gameState.opponentSymbol);
      setGameState((prevState) => ({
        ...prevState,
        isGameStart: true,
      }));
      console.log("Saved Player Symbol:", localStorage.getItem("savedPlayerSymbol"));
      console.log("Saved Opponent Symbol:", localStorage.getItem("savedOpponentSymbol"));
      console.log("Saved Difficulty:", gameState.difficulty);
    } else {
      setGameState((prevState) => ({
        ...prevState,
        isGameStart: false,
      }));
    }
  }, [gameState.playerSymbol, gameState.opponentSymbol, gameState.difficulty]);

  // Restart the game
  const handleRestart = useCallback(() => {
    console.log("### Restart Game Debug");
    const { playerSymbol, opponentSymbol } = restoreSymbols();
    setGameState((prevState) => ({
      ...prevState,
      board: Array(9).fill(null),
      aiThinking: false,
      winnerInfo: null,
      isDialogOpen: false,
      playerSymbol,
      opponentSymbol,
    }));
    console.log("Restart => Player Symbol:", playerSymbol);
    console.log("Restart => Opponent Symbol:", opponentSymbol);
    console.log("Restart => Difficulty:", gameState.difficulty);
  }, [gameState.difficulty]);

  // Reset the game to initial state
  const handleReset = useCallback(() => {
    console.log("### Reset Game Debug");
    localStorage.clear();
    setGameState((prevState) => ({
      ...prevState,
      board: Array(9).fill(null),
      playerSymbol: "O",
      opponentSymbol: "X",
      aiThinking: false,
      winnerInfo: null,
      isGameStart: false,
      isDialogOpen: false,
      difficulty: "easy",
    }));
    console.log("Reset => Player Symbol: O");
    console.log("Reset => Opponent Symbol: X");
    console.log("Reset => Difficulty: easy");
  }, []);

  // Handle player move
  const handlePlayerMove = useCallback(
    (index) => {
      if (!gameState.playerSymbol || gameState.board[index] || gameState.winnerInfo) return;

      // Update board with player's move
      const newBoard = [...gameState.board];
      newBoard[index] = gameState.playerSymbol;
      setGameState((prevState) => ({
        ...prevState,
        board: newBoard,
        aiThinking: true,
      }));

      // Check for winner after player's move
      const result = calculateWinner(newBoard);
      if (result) {
        setGameState((prevState) => ({
          ...prevState,
          winnerInfo: result,
        }));
        return;
      }

      // AI move
      const aiMove = getAIMove(newBoard);
      if (aiMove !== null) {
        setTimeout(() => {
          const updatedBoard = [...newBoard];
          updatedBoard[aiMove] = gameState.opponentSymbol;
          setGameState((prevState) => ({
            ...prevState,
            board: updatedBoard,
            aiThinking: false,
          }));

          // Check for winner after AI's move
          const aiResult = calculateWinner(updatedBoard);
          if (aiResult) {
            setGameState((prevState) => ({
              ...prevState,
              winnerInfo: aiResult,
            }));
          }
        }, 1200); // Simulate AI "thinking"
      }
    },
    [gameState.board, gameState.playerSymbol, gameState.opponentSymbol, gameState.winnerInfo]
  );

  // ### AI Logic

  // Get AI move based on difficulty
  const getAIMove = useCallback(
    (board) => {
      if (gameState.difficulty === "easy") {
        return getRandomMove(board);
      } else {
        return getMinimaxMove(board);
      }
    },
    [gameState.difficulty]
  );

  // Get a random move (for easy difficulty)
  const getRandomMove = useCallback((board) => {
    const availableMoves = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }, []);

  // Get the best move using the minimax algorithm (for hard difficulty)
  const getMinimaxMove = useCallback(
    (board) => {
      const minimax = (board, depth, isMaximizing, alpha, beta) => {
        const result = calculateWinner(board);

        // Use dynamic symbols
        if (result?.winner === gameState.opponentSymbol) return 10 - depth; // AI wins
        if (result?.winner === gameState.playerSymbol) return depth - 10; // Player wins
        if (board.every((cell) => cell !== null)) return 0; // Draw

        if (isMaximizing) {
          let bestScore = -Infinity;
          for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
              const newBoard = [...board];
              newBoard[i] = gameState.opponentSymbol; // AI's symbol
              const score = minimax(newBoard, depth + 1, false, alpha, beta);
              bestScore = Math.max(score, bestScore);
              alpha = Math.max(alpha, bestScore);
              if (beta <= alpha) break; // Alpha-beta pruning
            }
          }
          return bestScore;
        } else {
          let bestScore = Infinity;
          for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
              const newBoard = [...board];
              newBoard[i] = gameState.playerSymbol; // Player's symbol
              const score = minimax(newBoard, depth + 1, true, alpha, beta);
              bestScore = Math.min(score, bestScore);
              beta = Math.min(beta, bestScore);
              if (beta <= alpha) break; // Alpha-beta pruning
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
          newBoard[i] = gameState.opponentSymbol; // Use AI's symbol
          const score = minimax(newBoard, 0, false, -Infinity, Infinity);
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      }
      return bestMove;
    },
    [gameState.opponentSymbol, gameState.playerSymbol]
  );

  // ### Render

  const isDraw = gameState.board.every((square) => square !== null);

  return (
    <>
      <section className="game">
        <div className="board-holder mx-3 lg:w-2/6 md:w-9/12 w-11/12">
          {!gameState.isGameStart ? (
            <Dashboard playerSymbol={gameState.playerSymbol} onChoose={handleSymbolSelection}>
              <div className="flex justify-between items-center gap-2">
                <select
                  value={gameState.difficulty}
                  onChange={(e) =>
                    setGameState((prevState) => ({
                      ...prevState,
                      difficulty: e.target.value,
                    }))
                  }
                  className="block w-1/2 h-12 text-b text-primary font-bold uppercase text-center rounded-lg focus:outline-none focus:none">
                  <option value="easy">Easy</option>
                  <option value="hard">Hard</option>
                </select>
                <button
                  className="bg-yellow-400 hover:bg-yellow-300 w-1/2 h-12 font-bold rounded-lg text-primary"
                  onClick={startGame}>
                  START GAME
                </button>
              </div>
            </Dashboard>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <div className="board-header flex flex-row justify-between items-center gap-6 w-full">
                <Logo onReset={handleReset} />
                <TheStatus
                  winner={gameState.winnerInfo?.winner}
                  isDraw={isDraw}
                  aiThink={gameState.aiThinking}
                  playerSymbol={gameState.playerSymbol}
                  winnerInfo={gameState.winnerInfo} />
                <RestartButton onRestart={handleRestart} />
              </div>
              <Board
                className="w-full"
                board={gameState.board}
                onClick={handlePlayerMove}
                aiThink={gameState.aiThinking}
                winningLine={gameState.winnerInfo?.winningLine}
                playerSymbol={gameState.playerSymbol} />
            </div>
          )}
        </div>
      </section>
      <Dialog
        isOpen={gameState.isDialogOpen} onClose={() => setGameState((prevState) => ({ ...prevState, isDialogOpen: false }))}>
        <h2 className="text-base mb-4 text-center text-secondary">
          {gameState.winnerInfo?.winner === gameState.playerSymbol
            ? "CONGRAT, YOU WIN..."
            : gameState.winnerInfo?.winner === gameState.opponentSymbol
              ? "OH NO, YOU LOST..."
              : "IT'S A DRAW!"}
        </h2>
        <div
          className={`lg:text-4xl sm:text-3xl font-bold mb-4 text-center flex justify-center items-center sm:gap-2 gap-4 ${gameState.winnerInfo?.winner === "X" ? "text-teal-500" : "text-yellow-500"}`}>
          {gameState.winnerInfo?.winner ?
            <>
              <span className="lg:text-5xl sm:text-3xl">{gameState.winnerInfo?.winner}</span>
              <span>TAKES THE ROUND</span>
            </>
            : <span className="lg:text-5xl sm:text-3xl">You Can Repeat</span>
          }
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setGameState((prevState) => ({ ...prevState, isDialogOpen: false }))}
            className="close-modal hover:bg-white lg:text-4xl sm:text-2xl"
          >
            Close
          </button>
          <button onClick={handleRestart} className="play-again hover:bg-yellow-300 lg:text-4xl sm:text-2xl">
            Repeat
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default App;