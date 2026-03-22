import { useState } from "react";

const TextCheckBox = (props) => {
    const {text, setText, filterBox, updateFilterHandler} = props;

    return (
        <div>
            <input type="checkbox" checked={filterBox.active} 
                disabled={(text.length === 0)}
                onChange={()=>updateFilterHandler(filterBox.type, text, text, !filterBox.active)}
            />
            <input type="text" value={text} placeholder="Enter keyword..."
                onChange={
                    (e)=>{
                        // Change 
                        setText(e.target.value)

                        // Delete Old text
                        if (filterBox.active) updateFilterHandler(filterBox.type, text, text, false);

                        // Add new if not nothing
                        if (e.target.value.length > 0) updateFilterHandler(filterBox.type, e.target.value, e.target.value, true)
                    }
                }
            />
        </div>
    )
}

export default TextCheckBox;