import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Calculate winner by checking all possible winning combinations
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check if the game is a draw
  const isDraw = (squares) => {
    return squares.every(square => square !== null);
  };

  // Handle cell click
  const handleClick = (index) => {
    const newBoard = [...board];
    
    // Return if cell is filled or there's a winner
    if (calculateWinner(board) || board[index]) {
      return;
    }

    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const gameIsDraw = !winner && isDraw(board);

  // Generate status message
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (gameIsDraw) {
    status = "Game is a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="App">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-status">{status}</div>
      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell?.toLowerCase()}`}
            onClick={() => handleClick(index)}
            disabled={cell !== null || winner !== null}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
