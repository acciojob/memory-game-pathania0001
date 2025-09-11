import React from "react";

function Tile({ tile, onFlip }) {
  return (
    <div
      className={`cell flex items-center justify-center rounded text-white text-xl cursor-pointer h-16
        ${tile.flipped || tile.matched ? "bg-green-500" : "bg-blue-500"}`}
      onClick={() => onFlip(tile)}
    >
      {tile.flipped || tile.matched ? tile.value : "?"}
    </div>
  );
}

export default Tile;
