import { useState } from "react";
import ShapeSelector from "./components/ShapeSelector";
import Board from "./components/Board";
function Game() {
  //state for turn
  const [selectedShape, setSelectedShape] = useState("");
  //state for grid value
  const [gridVal, setGridVal] = useState<string[]>(Array(0).fill(""));
  const handleClick = (val: string) => {
    setSelectedShape(val);
  };
  const handleGridValue = (index: number) => {
    if (!selectedShape) {
      return;
    }
    setGridVal((prev) => {
      const copy = [...prev];
      copy[index] = selectedShape;
      return copy;
    });
  };
  const handleGridSize = (size: number) => {
    setGridVal(Array(size).fill(""))
  };
  return (
    <>
      {/* radio button to select Circle or Cross */}
      <ShapeSelector
        value={selectedShape}
        onAction={handleClick}
        onGridSize={handleGridSize}
      />
      <Board 
        gridValue={gridVal} 
        onAction={handleGridValue} 
      />
    </>
  );
}

export default Game;
