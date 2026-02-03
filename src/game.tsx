import { useState } from "react";
import ShapeSelector from "./components/ShapeSelector";
import Board from "./components/Board";
import BoardCondition from "./components/board-condition";
function Game() {
  //state for turn
  const [selectedShape, setSelectedShape] = useState<string>("");
  //state for grid value
  const [gridVal, setGridVal] = useState<string[]>(Array(0).fill(""));
  //state for player turn
  const [playerTurn, setPlayerTurn] = useState<boolean>(true); //true is player 1
  //state for required count to win
  const [winCount, setWinCount] = useState<number>(3);

  const handleClick = (val: string) => {
    setSelectedShape(val);
  };
  const winner = () => {
    const n = Math.sqrt(gridVal.length);
    if (!Number.isInteger(n)) return null;
    const get = (r: number, c: number) => gridVal[r * n + c];
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const start = get(r, c);
        if (!start) continue;
        for (const [dr, dc] of directions) {
          let count = 1;
          for (let k = 1; k < winCount; k++) {
            const nr = r + dr * k;
            const nc = c + dc * k;
            if (
              nr < 0 ||
              nr >= n ||
              nc < 0 ||
              nc >= n ||
              get(nr, nc) !== start
            ) {
              break;
            }
            count++;
          }
          if (count === winCount) {
            return start;
          }
        }
      }
    }

    return null;
  };
  const handleWinCount = (val: number) => {
    setWinCount(val);
  };
  const handleGridValue = (index: number) => {
    if (!selectedShape || winner() || gridVal[index]) {
      return;
    }
    setGridVal((prev) => {
      const copy = [...prev];
      copy[index] = selectedShape;
      return copy;
    });
    setSelectedShape((prev) => (prev === "O" ? "X" : "O"));
    setPlayerTurn((prev) => (prev ? false : true));
    winner();
  };
  const handleGridSize = (size: number) => {
    setGridVal(Array(size).fill(""));
  };
  return (
    <>
      <h3>{playerTurn ? "PLAYER ONE TURN" : "PLAYER TWO TURN"}</h3>
      {!selectedShape ? (
        <p>Choose a shape to begin</p>
      ) : (
        winner() && <h4>{!playerTurn ? "PLAYER ONE WIN" : "PLAYER TWO WIN"}</h4>
      )}
      <ShapeSelector value={selectedShape} onAction={handleClick} />
      <BoardCondition
        winCount={winCount}
        onWinCount={handleWinCount}
        onGridSize={handleGridSize}
      />
      <Board gridValue={gridVal} onAction={handleGridValue} />
      
    </>
  );
}

export default Game;
