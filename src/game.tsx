import { useState } from "react";
import ShapeSelector from "./components/ShapeSelector";
import Board from "./components/Board";
import BoardSetting from "./components/board-settings";
import getWinner from "./helper/getWinner";
import type { shape } from "./types/shape";

const defaultShape = "O";
const defaultGridSize = 3;
const defaultWinCount = 3;

function Game() {
  const [selectedShape, setSelectedShape] = useState<shape>(defaultShape);

  //state for grid value
  const [gridArr, setGridVal] = useState<shape[]>(
    Array(defaultGridSize * defaultGridSize).fill(""),
  );

  const [lastMove, setLastMove] = useState<number>(-1)
  const [gridSize, setGridSize] = useState<number>(defaultGridSize);

  //state for required count to win
  const [winCount, setWinCount] = useState<number>(defaultWinCount);
  //state for winner
  // const [winnerState, setWinnerState] = useState<string>("");
  // //state for winning set
  // const [winningSets, setWinningSets] = useState<number[]>(Array(0).fill(0));

  const player1 = selectedShape === "O";

  const handleShapeSwap = (val: shape) => {
    setSelectedShape(val);
  };

  const winnerResult = getWinner(gridArr, winCount, lastMove);

  const handleWinCount = (val: number) => {
    setWinCount(val);
  };

  const handleGridValue = (index: number) => {
    if (!selectedShape || !!winnerResult?.player || gridArr[index]) {
      return;
    }
    setLastMove(index);
    setGridVal((prev) => {
      const copy = [...prev];
      copy[index] = selectedShape;
      // winner(copy)
      return copy;
    });
    setSelectedShape((prev) => (prev === "O" ? "X" : "O"));
  };

  const handleGameRestart = () => {
    setGridVal(Array(gridSize * gridSize).fill(""));
    setSelectedShape(defaultShape);
  };

  const handleGridSize = (size: number) => {
    setGridSize(size);
    setGridVal(Array(size * size).fill(""));
  };
  const draw =
    !winnerResult?.player && gridArr && gridArr.every((c) => c !== "");

  const statusText = winnerResult?.player
    ? `${winnerResult.player} WINS`
    : draw
      ? `DRAW`
      : player1
        ? "PLAYER ONE TURN"
        : "PLAYER TWO TURN";

  return (
    <>
      <h3>{statusText}</h3>
      <ShapeSelector value={selectedShape} onAction={handleShapeSwap} />
      <br />
      <BoardSetting
        size={gridSize}
        winCount={winCount}
        onWinCount={handleWinCount}
        onGridSize={handleGridSize}
        onRestart={handleGameRestart}
      />
      <br />
      <Board
        gridValue={gridArr}
        onAction={handleGridValue}
        winningRow={winnerResult?.winningCombination}
      />
    </>
  );
}

export default Game;
