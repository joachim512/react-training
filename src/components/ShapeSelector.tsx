import type { shape } from "../types/shape";

interface props {
  value: string;
  onAction: (value: shape) => void;
}
function ShapeSelector({ value, onAction }: props) {
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
                onAction("O");
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
                onAction("X");
              }}
            />
            Cross
          </label>
        </div>
        
      </div>
    </>
  );
}

export default ShapeSelector;
