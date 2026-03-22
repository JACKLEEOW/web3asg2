import { useState } from "react";
import CheckBox from "./CheckBox.jsx"

const CheckList = (props) => {
    const {label, filterBoxes, updateFilterHandler, CheckboxComponent} = props;
    const [isOpen, setIsOpen] = useState(true);
    const [text, setText] = useState("");

    if (isOpen) {
        return (
            <div>
                <p onClick={()=>(setIsOpen(false))}> {label} [Opened] </p>
                {filterBoxes.map((filterBox, index)=>(
                    <CheckboxComponent 
                        key={index} 
                        filterBox={filterBox} 
                        updateFilterHandler={updateFilterHandler} 
                        text={text} 
                        setText={setText}
                    /> 
                    ))}
            </div>
        )
    } else {
        return <div> <p onClick={()=>(setIsOpen(true))}> {label} [Closed] </p> </div>
    }

}

export default CheckList;