import React, { useState } from "react";

function FormValue({label, value, edit, inputType, stateKey, parentCallback}) {

    function changeValue(e) {
        value = e.target.value;
        parentCallback(stateKey, e.target.value);
    }

    return (
        <div>
            <label>{label}</label> {edit ? <input type={inputType} onChange={changeValue} value={value}/> : <span>{value}</span>}
            <div style={{display:"none"}}><span>{stateKey}</span></div>
        </div>
    );

} export default FormValue;

