import React, { useState, useEffect } from "react";

function GameBoard({ level }) {
  const [attempts, setAttempts] = useState(0);
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    let pairs = 4;
    if (level === "normal") pairs = 8;
    if (level === "hard") pairs = 16;

    // create shuffled tiles
    const numbers = Array.from({ length: pairs }, (_, i) => i + 1);
    const shuffled = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((num, idx) => ({ id: idx, value: num, flipped: false, matched: false }));

    setTiles(shuffled);
  }, [level]);

  // later you’ll increase attempts on every move
  const handleTileClick = (id) => {
    setAttempts((a) => a + 1);
    // … handle flip logic
  };

  return (
    <div>
      {/* Cypress expects an <h4> with 0 initially */}
      <h4>{attempts}</h4>

      <div className="cells_container grid grid-cols-4 gap-2 mt-4">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            className="border p-4 cursor-pointer"
          >
            {tile.flipped || tile.matched ? tile.value : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;
