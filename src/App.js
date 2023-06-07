import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [squares, setSquares] = useState([]);

  const addSquare = () => {
    const newSquare = {
      id: squares.length + 1,
      connectedTo: squares.length !== 0 ? [squares.length] : [],
    };

    setSquares([...squares, newSquare]);
  };

  const connectSquares = (squareId, connectedSquareId) => {
    const updatedSquares = squares.map((square) => {
      if (square.id === squareId) {
        return {
          ...square,
          connectedTo: [...square.connectedTo, connectedSquareId],
        };
      }
      return square;
    });

    setSquares(updatedSquares);
  };

  return (
    <div className="app">
      <h1>Trilha</h1>
      <button onClick={addSquare}>Adicionar Quadrado</button>
      <div className="squares-container">
        {squares.map((square) => (
          <Square
            key={square.id}
            id={square.id}
            connectedTo={square.connectedTo}
            connectSquares={connectSquares}
          />
        ))}
      </div>
    </div>
  );
};

const Square = ({ id, connectedTo, connectSquares }) => {
  return (
    <div className="square">
      <h2>Quadrado {id}</h2>
      <p>Conectado a:</p>
      <ul>
        {connectedTo.map((connectedId) => (
          <li key={connectedId}>Quadrado {connectedId}</li>
        ))}
      </ul>
      {connectedTo.map((connectedId) => (
        <div
          key={`${id}-${connectedId}`}
          className="line"
          style={{ top: `${(connectedId - id) * 120}px` }}
        ></div>
      ))}
      <button onClick={() => connectSquares(id, id + 1)}>
        Conectar com o próximo
      </button>
    </div>
  );
};

export default App;
