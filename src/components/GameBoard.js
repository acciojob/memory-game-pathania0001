import React, { useState, useEffect } from "react";
import Tile from "./Tile";

function GameBoard({ level }) {
  const [attempts, setAttempts] = useState(0);
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    let pairs = 4;
    if (level === "normal") pairs = 8;
    if (level === "hard") pairs = 16;

    const numbers = Array.from({ length: pairs }, (_, i) => i + 1);
    const shuffled = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((num, idx) => ({
        id: idx,
        value: num,
        flipped: false,
        matched: false,
      }));

    setTiles(shuffled);
  }, [level]);

  const handleTileClick = (tile) => {
    setAttempts((a) => a + 1);
    // later: matching logic goes here
  };

  return (
    <div>
      {/* Cypress expects an <h4> with 0 initially */}
      <h4>{attempts}</h4>

      <div className="cells_container grid grid-cols-4 gap-2 mt-4">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} onFlip={handleTileClick} />
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
