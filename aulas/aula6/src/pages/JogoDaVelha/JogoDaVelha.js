import React, { useState } from "react";
import "./JogoDaVelha.css";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function JogoDaVelha() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const nextPlayer = xIsNext ? "X" : "O";
  const status = winner
    ? `Vencedor: ${winner}`
    : squares.every(Boolean)
    ? "Empate!"
    : `Próximo jogador: ${nextPlayer}`;

  const handleClick = (index) => {
    if (winner || squares[index]) return;

    const nextSquares = squares.slice();
    nextSquares[index] = nextPlayer;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="container">
      <h1>Jogo da Velha</h1>

      <div className="board">
        {squares.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="square"
          >
            {value}
          </button>
        ))}
      </div>

      <div className="status">{status}</div>

      <button onClick={resetGame} className="reset-button">
        Reiniciar
      </button>
    </div>
  );
}

export default JogoDaVelha;