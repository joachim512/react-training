// import button from "../components/button";

interface boardProps{
    gridValue:string[]; //This value is the user input for the grid
    onAction: (index: number, value: string)=>void
}

function Board({gridValue, onAction}:boardProps){
    
    return(
        <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
                {gridValue.map((value, index) => (
                    <button
                        key={index}
                        onClick={() => onAction(index, value)}
                    >
                    {value}
                    </button>
                ))}
            </div>

        </>
    )

}

export default Board;