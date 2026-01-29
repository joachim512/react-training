import { useState } from 'react'
import Buttons from './buttons'
function game(){
    const[currentValue, setCurrentValue] = useState("");
        const handleClick = (val:string)=>{
            setCurrentValue(val);
        }
    return (
        <>
            {/* radio button to select Circle or Cross */}
            <Buttons value={currentValue} onAction={handleClick}/>
        </>
    )
}

export default game;