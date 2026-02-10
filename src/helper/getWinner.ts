const getWinner = (board: string[], winCount: number) => {
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
    let winningCombination: number[] = [i];
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
        return {player, winningCombination}
    }
  }

  return null;
};

export default getWinner;
