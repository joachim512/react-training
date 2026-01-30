interface props {
  value: string;
  onAction: (value: string) => void;
  onGridSize: (value: number) => void;
}
function Buttons({ value, onAction, onGridSize }: props) {
  return (
    <>
      <div className="card">
        <div className="container">
          <label className="padding">
            <input
              className="padding"
              type="radio"
              name="choice"
              value="O"
              checked={value === "O"}
              onChange={(e) => {
                onAction(e.target.value);
              }}
            />
            Circle
          </label>

          <br />

          <label className="padding">
            <input
              className="padding"
              type="radio"
              name="choice"
              value="X"
              checked={value === "X"}
              onChange={(e) => {
                onAction(e.target.value);
              }}
            />
            Cross
          </label>
        </div>
        <div className="padding">
          <label htmlFor="gridSize">
            Grid Size:
            <input
              type="number"
              onChange={(e) => {
                onGridSize(Number(e.target.value));
              }}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default Buttons;
