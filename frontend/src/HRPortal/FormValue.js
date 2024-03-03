import React, { useState } from "react";

function FormValue({label, value, edit, inputType, stateKey, parentCallback, editable, options, max, min}) {

    function changeValue(e) {
        value = e.target.value;
        parentCallback(stateKey, e.target.value);
    }

    return (
        <div>
            <label>{label}</label> {(editable ? edit : false) ? (inputType === 'select' ? <select value={value} onChange={changeValue}>{options.map(v => <option value={v}>{v}</option>)}</select> : <input type={inputType} onChange={changeValue} value={value} max={max} min={min}/>) : <span>{value}</span>}
            <div style={{display:"none"}}><span>{stateKey}</span></div>
        </div>
    );

} export default FormValue;

