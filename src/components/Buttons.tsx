interface props{
    value: string;
    onAction: (value: string) => void
}
function Buttons({value, onAction,}:props){
    return(
        <>
            <div className='card'>
                <div className="container">
                    <label className='padding'>
                        <input
                        className='padding'
                        type="radio"
                        name="choice"
                        value="X"
                        checked={value === "X"}
                        onChange={(e)=>{onAction(e.target.value)}}
                        />
                        Circle
                    </label>

                    <br />

                    <label className='padding'>
                        <input
                        className='padding'
                        type="radio"
                        name="choice"
                        value="O"
                        checked={value === "O"}
                        onChange={(e)=>{onAction(e.target.value)}}
                        />
                        Cross
                    </label>
                </div>
                <p>Active: {value}</p>
            </div>
        </>
    );
}



export default Buttons