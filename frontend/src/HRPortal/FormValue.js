import React, { useState } from "react";

function FormValue({label, value, edit, inputType, stateKey, parentCallback}) {

    const [inputValue, setInputValue] = useState(value);
    function changeValue(e) {
        setInputValue(e.target.value);
        parentCallback(stateKey, e.target.value);
    }

    return (
        <div>
            <label>{label}</label> {edit ? <input type={inputType} onChange={changeValue} value={inputValue}/> : <span>{value}</span>}
            <div style={{display:"none"}}><span>{stateKey}</span></div>
        </div>
    );

} export default FormValue;

