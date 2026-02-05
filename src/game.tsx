import { useState } from "react";
import ShapeSelector from "./components/ShapeSelector";
import Board from "./components/Board";
import BoardCondition from "./components/board-settings";
function Game() {
  //state for turn
  const [selectedShape, setSelectedShape] = useState<string>("");
  //state for grid value
  const [gridVal, setGridVal] = useState<string[]>(Array(0).fill(""));
  //State for grid size
  const [gridSize, setGridSize] = useState<number>(0);
  //state for player turn
  const [playerTurn, setPlayerTurn] = useState<boolean>(true); //true is player 1
  //state for required count to win
  const [winCount, setWinCount] = useState<number>(3);
  //state to determine winner


  const handleClick = (val: string) => {
    setSelectedShape(val);
  };
  const winner = () => {
    const numCols = Math.floor(Math.sqrt(gridSize));

    const directions = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 },
    ];

    const getVal = (r: number, c: number) => {
      if (c < 0 || c >= numCols || r < 0) return null;
      const index = r * numCols + c;
      return gridVal[index] || null;
    };

    for (let i = 0; i < gridVal.length; i++) {
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const player = gridVal[i];

      if (!player) continue;

      const isWin = directions.some(({ dr, dc }) => {
        for (let step = 1; step < winCount; step++) {
          if (getVal(row + dr * step, col + dc * step) !== player) {
            return false;
          }
        }
        return true;
      });

      if (isWin) return player;
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
    // winner();
  };
  const handleGameRestart = () => {
    setGridVal(Array(gridSize).fill(""));
    setPlayerTurn(true);
    setSelectedShape("");
  };
  const handleGridSize = (size: number) => {
    setGridSize(size);
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
      <br />
      <BoardCondition
        size={gridSize}
        winCount={winCount}
        onWinCount={handleWinCount}
        onGridSize={handleGridSize}
        onRestart={handleGameRestart}
      />
      <br />
      <Board gridValue={gridVal} onAction={handleGridValue} />
    </>
  );
}

export default Game;
