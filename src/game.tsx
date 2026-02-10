import { useState } from "react";
import ShapeSelector from "./components/ShapeSelector";
import Board from "./components/Board";
import BoardSetting from "./components/board-settings";

const defaultShape = "O";
const defaultGridSize = 3;
const defaultWinCount = 3;

function Game() {
  const [selectedShape, setSelectedShape] = useState<string>(defaultShape);
  //state for grid value
  const [gridVal, setGridVal] = useState<string[]>(
    Array(defaultGridSize * defaultGridSize).fill(""),
  );

  const [gridSize, setGridSize] = useState<number>(defaultGridSize);

  //state for required count to win
  const [winCount, setWinCount] = useState<number>(defaultWinCount);
  //state for winner
  // const [winnerState, setWinnerState] = useState<string>("");
  // //state for winning set
  // const [winningSets, setWinningSets] = useState<number[]>(Array(0).fill(0));

  const player1 = selectedShape === "X";

  const handleClick = (val: string) => {
    setSelectedShape(val);
  };

  const getWinner = (board: string[]) => {
    // debugger;
    const numCols = Math.floor(Math.sqrt(board.length));

    const directions = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 },
    ];

    const getVal = (r: number, c: number) => {
      if (c < 0 || c >= numCols || r < 0) return null;
      const index = r * numCols + c;
      return { gridValue: board[index] || "", Index: index };
    };

    for (let i = 0; i < board.length; i++) {
      const winningCombination: number[] = [i];
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const player = board[i];

      if (!player) continue;

      const isWin = directions.some(({ dr, dc }) => {
        for (let step = 1; step < winCount; step++) {
          const { gridValue, Index } =
            getVal(row + dr * step, col + dc * step) || {};
          if (gridValue !== player) {
            return false;
          }
          if (Index !== undefined) winningCombination.push(Index);
        }
        return true;
      });
      if (isWin) {
        return { player, winningCombination };
      }
    }

    return null;
  };

  const winnerResult = getWinner(gridVal);

  const handleWinCount = (val: number) => {
    setWinCount(val);
  };

  const handleGridValue = (index: number) => {
    if (!selectedShape || !!winnerResult?.player || gridVal[index]) {
      return;
    }
    setGridVal((prev) => {
      const copy = [...prev];
      copy[index] = selectedShape;
      // winner(copy)
      return copy;
    });
    setSelectedShape((prev) => (prev === "O" ? "X" : "O"));
  };

  const handleGameRestart = () => {
    setGridVal(Array(defaultGridSize * defaultGridSize).fill(""));
    setSelectedShape(defaultShape);
    setGridSize(defaultGridSize);
  };

  const handleGridSize = (size: number) => {
    setGridSize(size);
    setGridVal(Array(size * size).fill(""));
  };

  return (
    <>
      <h3>{player1 ? "PLAYER ONE TURN" : "PLAYER TWO TURN"}</h3>
      {!selectedShape ? (
        <p>Choose a shape to begin</p>
      ) : (
        winnerResult?.player && (
          <h4>{player1 ? "PLAYER ONE WIN" : "PLAYER TWO WIN"}</h4>
        )
      )}
      {!winnerResult?.player && gridVal && gridVal.every((c) => c !== "") && (
        <p>DRAW</p>
      )}
      <ShapeSelector value={selectedShape} onAction={handleClick} />
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
        gridValue={gridVal}
        onAction={handleGridValue}
        winningRow={winnerResult?.winningCombination}
      />
    </>
  );
}

export default Game;
