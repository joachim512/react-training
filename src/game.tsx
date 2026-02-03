import { useState } from "react";
import ShapeSelector from "./components/ShapeSelector";
import Board from "./components/Board";
function Game() {
  //state for turn
  const [selectedShape, setSelectedShape] = useState<string>("");
  //state for grid value
  const [gridVal, setGridVal] = useState<string[]>(Array(0).fill(""));
  const handleClick = (val: string) => {
    setSelectedShape(val);
  };
  const winner = () => {
    // condition to check if its an OX board
    if (gridVal.length === 9) {
      const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i: number = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        if (
          gridVal[a] &&
          gridVal[a] === gridVal[b] &&
          gridVal[a] === gridVal[c]
        ) {
          return gridVal[a];
        }
      }
    }
    return null;
  };
  const handleGridValue = (index: number) => {
    if (!selectedShape || winner()) {
      return;
    }
    setGridVal((prev) => {
      const copy = [...prev];
      copy[index] = selectedShape;
      return copy;
    });
    setSelectedShape((prev) => (prev === "O" ? "X" : "O"));
    winner();
  };
  const handleGridSize = (size: number) => {
    setGridVal(Array(size).fill(""));
  };
  return (
    <>
      {!selectedShape ? (
        <p>Choose a shape to begin</p>
      ) : (
        winner() && <p>The Winner is: {winner()}</p>
      )}
      <ShapeSelector
        value={selectedShape}
        onAction={handleClick}
        onGridSize={handleGridSize}
      />
      <Board gridValue={gridVal} onAction={handleGridValue} />
    </>
  );
}

export default Game;
