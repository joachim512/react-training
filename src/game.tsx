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
  //state for winner
  const [winnerState, setWinnerState] = useState<string>("");
  //state for winning set
  const [winningSets, setWinningSets] = useState<number[]>(Array(0).fill(0));
  
  const handleClick = (val: string) => {
    setSelectedShape(val);
  };

  const winner = (copy: string[]) => {
    // debugger;
    // selectedShape, playerTurn, gridVal
    const numCols = Math.floor(Math.sqrt(copy.length));

    const directions = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 },
      { dr: 1, dc: -1 },
    ];

    const getVal = (r: number, c: number) => {
      if (c < 0 || c >= numCols || r < 0) return null;
      const index = r * numCols + c;
      return { gridValue: copy[index] || "", Index: index };
    };

    for (let i = 0; i < copy.length; i++) {
      let winningCombination: number[] = [i];
      const row = Math.floor(i / numCols);
      const col = i % numCols;
      const player = copy[i];

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
        setWinningSets(winningCombination);
        setWinnerState(player);
        return player;
      }
    }

    return null;
  };


  const handleWinCount = (val: number) => {
    setWinCount(val);
  };

  const handleGridValue = (index: number) => {
    if (!selectedShape || !!winnerState || gridVal[index]) {
      return;
    }
    setGridVal((prev) => {
      const copy = [...prev];
      copy[index] = selectedShape;
      winner(copy)
      return copy;
    });
    setSelectedShape((prev) => (prev === "O" ? "X" : "O"));
    setPlayerTurn((prev) => (prev ? false : true));
  };

  const handleGameRestart = () => {
    setWinningSets(Array(0).fill(0));
    setWinnerState("");
    setGridVal(Array(0).fill(""));
    setPlayerTurn(true);
    setSelectedShape("");
    setGridSize(0);
  };

  const handleGridSize = (size: number) => {
    setGridSize(size);
    setGridVal(Array(size * size).fill(""));
  };

  return (
    <>
      <h3>{playerTurn ? "PLAYER ONE TURN" : "PLAYER TWO TURN"}</h3>
      {!selectedShape ? (
        <p>Choose a shape to begin</p>
      ) : (
        winnerState  && (
          <h4>{!playerTurn ? "PLAYER ONE WIN" : "PLAYER TWO WIN"}</h4>
        )
      )}{
        (winningSets.length === 0 
          && gridVal.every(c => c !== "")
        ) && <p>DRAW</p>
      }
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
      <Board
        gridValue={gridVal}
        onAction={handleGridValue}
        winningRow={winningSets}
      />
    </>
  );
}

export default Game;
