interface props {
  size: number;
  winCount: number;
  onGridSize: (value: number) => void;
  onWinCount: (value: number) => void;
  onRestart: ()=>void
}

const BoardSetting = ({ winCount, size, onWinCount, onGridSize, onRestart }: props) => {
  // const [gridSize, setGridSize] = useState<number>(defaultGridSize);
  return (
    <>
      <div className="card">
        <div className="padding">
          <div className="container">
            <label htmlFor="gridSize" className="grid-column">
              Grid Size:
              <input
                value={size}
                type="number"
                onChange={(e) => {
                  onGridSize(Number(e.target.value));
                }}
              />
            </label>

            <div className="container">
              <button
                onClick={onRestart}
               >
                New Game
              </button>
            </div>

            <label htmlFor="gridSize" className="grid-column">
              Winning Count:
              <input
                type="number"
                value={winCount}
                onChange={(e) => {
                  onWinCount(Number(e.target.value));
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default BoardSetting;
