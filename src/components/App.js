import React, { useState } from "react";
import GameBoard from "./GameBoard";

function App() {
  const [level, setLevel] = useState("easy");
  const [start, setStart] = useState(false);

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>

      {/* Difficulty Levels */}
      <div className="levels_container mb-4 flex justify-center">
        <div className="mr-4 inline-block">
          <input
            type="radio"
            name="level"
            id="easy"
            checked={level === "easy"}
            onChange={() => setLevel("easy")}
          />
          <label htmlFor="easy">
            <span>Easy</span>
          </label>
        </div>

        <div className="mr-4 inline-block">
          <input
            type="radio"
            name="level"
            id="normal"
            checked={level === "normal"}
            onChange={() => setLevel("normal")}
          />
          <label htmlFor="normal">
            <span>Normal</span>
          </label>
        </div>

        <div className="mr-4 inline-block">
          <input
            type="radio"
            name="level"
            id="hard"
            checked={level === "hard"}
            onChange={() => setLevel("hard")}
          />
          <label htmlFor="hard">
            <span>Hard</span>
          </label>
        </div>

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