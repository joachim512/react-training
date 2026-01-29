import { useState } from 'react'
import Buttons from './components/Buttons'
import Board from './components/Board';
function Game(){
    const[currentValue, setCurrentValue] = useState(""); //state for turn
    //state for grid value
    const[gridVal, setGridVal] = useState<string[]>(Array(100).fill(""));
    const handleClick = (val:string)=>{
        setCurrentValue(val);
    }
    const handleGridValue = (index:number) =>{
        if(!currentValue){
            return;
        }
        setGridVal(prev => {
            const copy = [...prev];
            copy[index] = currentValue;
            return copy;
        });
    }
    return (
        <>
            {/* radio button to select Circle or Cross */}
            <Buttons value={currentValue} onAction={handleClick}/>
            <Board gridValue={gridVal} onAction={handleGridValue}/>
        </>
    )
}

export default Game;