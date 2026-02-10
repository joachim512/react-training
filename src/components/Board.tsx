// import button from "../components/button";

interface boardProps {
  gridValue: string[]; //This value is the user input for the grid
  winningRow?: number[];
  onAction: (index: number, value: string) => void;
}

function Board({ gridValue, winningRow, onAction }: boardProps) {
  const squareRoot = Math.floor(Math.sqrt(gridValue.length));
  const indexes = new Set(winningRow);
  return (
    <>
      <div
        className="gridContainer"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${squareRoot}, 0fr)`,
        }}
      >
        {gridValue.map((value, index) => (
          <button
            className={indexes.has(index) ? "square-highlight" : "square"}
            key={index}
            onClick={() => onAction(index, value)}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  );
}

export default Board;
