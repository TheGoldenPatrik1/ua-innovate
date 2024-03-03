import "../styles/Sidebar.css"
import FilterCategory from "./FilterCategory";
import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar({visible, filterChangeCallback, constants}) {
    const [filterCategories, setFilterCategories] = useState(constants);
    // filterCategories["Job Type"] = [["Full-Time", "Full-Time"], ["Internship", "Internship"]];
    // setFilterCategories(filterCategories);
    const filterDivs = [];
    for (const [key, value] of Object.entries(filterCategories)) {
        filterDivs.push(<FilterCategory name={key} data={value} onChange={filterChangeCallback}/>)
    }
    return(
        <div class="sidebar" style={visible ? {display:"block"} : {display: "none"}}>
            <h2>Filters</h2>
            {filterDivs}
        </div>
        
    )
} export default Sidebar;