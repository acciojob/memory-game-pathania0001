import React, { useState, useEffect } from "react";
import Tile from "./Tile";

function GameBoard({ level }) {
  const [tiles, setTiles] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [flipped, setFlipped] = useState([]); // currently flipped tiles
  const [matchedCount, setMatchedCount] = useState(0);

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
    setAttempts(0);
    setFlipped([]);
    setMatchedCount(0);
  }, [level]);

  const handleFlip = (tile) => {
    if (tile.flipped || tile.matched || flipped.length === 2) return;

    const newTiles = tiles.map((t) =>
      t.id === tile.id ? { ...t, flipped: true } : t
    );
    setTiles(newTiles);
    const newFlipped = [...flipped, tile];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setAttempts((a) => a + 1);
      const [first, second] = newFlipped;

      if (first.value === second.value) {
        // mark as matched
        setTiles((prev) =>
          prev.map((t) =>
            t.value === first.value ? { ...t, matched: true } : t
          )
        );
        setMatchedCount((m) => m + 1);
        setFlipped([]);
      } else {
        // flip back after delay
        setTimeout(() => {
          setTiles((prev) =>
            prev.map((t) =>
              t.id === first.id || t.id === second.id
                ? { ...t, flipped: false }
                : t
            )
          );
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div>
      <h4>{attempts}</h4>

      <div className="cells_container grid grid-cols-4 gap-2 mt-4">
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile} onFlip={handleFlip} />
        ))}
      </div>

      {matchedCount * 2 === tiles.length && (
        <div className="mt-4 font-bold text-green-600">🎉 All Matched!</div>
      )}
    </div>
  );
}

export default GameBoard;
