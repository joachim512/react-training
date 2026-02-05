// import button from "../components/button";

interface boardProps {
  gridValue: string[]; //This value is the user input for the grid
  onAction: (index: number, value: string) => void;
}

function Board({ gridValue, onAction }: boardProps) {
  const squareRoot = Math.floor(Math.sqrt(gridValue.length));
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
            className="square"
            key={index}
            onClick={() => onAction(index, value)}
          >
            {index}
          </button>
        ))}
      </div>
    </>
  );
}

export default Board;
