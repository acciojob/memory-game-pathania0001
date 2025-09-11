import React from "react"
import { useState } from "react";
import GameBoard from "./GameBoard";

function App() {
  const [level, setLevel] = useState("easy");
  const [start, setStart] = useState(false);

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>

      {/* Difficulty Levels */}
      <div className="levels_container mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="level"
            id="easy"
            checked={level === "easy"}
            onChange={() => setLevel("easy")}
          />{" "}
          <h4>Easy</h4>
          
        </label>
        <label className="mr-4">
          <input
            type="radio"
            name="level"
            id="normal"
            checked={level === "normal"}
            onChange={() => setLevel("normal")}
          />{" "}
          <h4>Normal</h4>
          
        </label>
        <label className="mr-4">
          <input
            type="radio"
            name="level"
            id="hard"
            checked={level === "hard"}
            onChange={() => setLevel("hard")}
          />{" "}
          <h4>
          Hard
          </h4>
        </label>
        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setStart(true)}
        >
          Start Game
        </button>
      </div>

      {start && <GameBoard level={level} />}
    </div>
  );
}

export default App;
