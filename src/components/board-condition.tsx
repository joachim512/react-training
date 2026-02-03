interface props {
  winCount: number;
  onGridSize: (value: number) => void;
  onWinCount: (value: number) => void;
}

const boardCondition = ({ winCount, onWinCount, onGridSize }: props) => {
  return (
    <>
      <div className="padding">
        <div className="container">
          <div className="grid-container">
            <label htmlFor="gridSize" className="grid-column">
              Grid Size:
              <input
                type="number"
                onChange={(e) => {
                  onGridSize(Number(e.target.value));
                }}
              />
            </label>
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
    </>
  );
};
export default boardCondition;
