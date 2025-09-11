import React,{ useState, useEffect } from "react";
import Tile from "./Tile";

const levels = {
  easy: 4,   // 4 pairs (8 tiles)
  normal: 8, // 8 pairs (16 tiles)
  hard: 16   // 16 pairs (32 tiles)
};

function GameBoard({ level }) {
  const [tiles, setTiles] = useState([]);
  const [firstTile, setFirstTile] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  useEffect(() => {
    startGame();
  }, [level]);

  const startGame = () => {
    const pairs = levels[level];
    const numbers = [...Array(pairs).keys()].flatMap(n => [n, n]);
    shuffle(numbers);

    const initializedTiles = numbers.map((num, idx) => ({
      id: idx,
      value: num,
      flipped: false,
      matched: false,
    }));

    setTiles(initializedTiles);
    setAttempts(0);
    setMatchedPairs(0);
    setFirstTile(null);
    setLockBoard(false);
  };

  const handleFlip = (clickedTile) => {
    if (lockBoard || clickedTile.flipped || clickedTile.matched) return;

    const updatedTiles = tiles.map(tile =>
      tile.id === clickedTile.id ? { ...tile, flipped: true } : tile
    );
    setTiles(updatedTiles);

    if (!firstTile) {
      setFirstTile(clickedTile);
      return;
    }

    setAttempts(a => a + 1);

    if (firstTile.value === clickedTile.value) {
      // Match
      setTiles(prev =>
        prev.map(tile =>
          tile.value === clickedTile.value
            ? { ...tile, matched: true }
            : tile
        )
      );
      setMatchedPairs(p => p + 1);
      setFirstTile(null);
    } else {
      // No match
      setLockBoard(true);
      setTimeout(() => {
        setTiles(prev =>
          prev.map(tile =>
            tile.id === clickedTile.id || tile.id === firstTile.id
              ? { ...tile, flipped: false }
              : tile
          )
        );
        setFirstTile(null);
        setLockBoard(false);
      }, 1000);
    }
  };

  const gridSize = Math.sqrt(levels[level] * 2);

  return (
    <div>
      <div
        className="cells_container grid gap-2 justify-center"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 80px)` }}
      >
        {tiles.map(tile => (
          <Tile key={tile.id} tile={tile} onFlip={handleFlip} />
        ))}
      </div>

      <p id="status" className="mt-4 font-semibold">
        {matchedPairs === levels[level]
          ? `🎉 You won in ${attempts} attempts!`
          : `Attempts: ${attempts}`}
      </p>
    </div>
  );
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default GameBoard;
