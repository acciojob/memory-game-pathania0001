import React, { useState } from "react";
import GameBoard from "./GameBoard";

function App() {
  const [level, setLevel] = useState("easy");
  const [start, setStart] = useState(false);

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>

      {/* Difficulty Levels */}
      <div className="levels_container mb-4">
  <input
    type="radio"
    name="level"
    id="easy"
    checked={level === "easy"}
    onChange={() => setLevel("easy")}
  />
  <label htmlFor="easy">Easy</label>

  <input
    type="radio"
    name="level"
    id="normal"
    checked={level === "normal"}
    onChange={() => setLevel("normal")}
  />
  <label htmlFor="normal">Normal</label>

  <input
    type="radio"
    name="level"
    id="hard"
    checked={level === "hard"}
    onChange={() => setLevel("hard")}
  />
  <label htmlFor="hard">Hard</label>

  <button onClick={() => setStart(true)}>Start</button>
</div>


      {start && <GameBoard level={level} />}
    </div>
  );
}

export default App;
