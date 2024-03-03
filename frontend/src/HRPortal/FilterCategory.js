import "../styles/FilterCategory.css"
import { MdOutlineExpandMore, MdOutlineArrowForwardIos } from "react-icons/md";
import { useState } from "react";

function FilterCategory({name, data, onChange}) {
    const [showCategory, setShowCategory] = useState(false)
    const options = [];
    const catName = "category-" + name.replace(/\s/g, '');
    const catToKeyMap = {
        "Job Type" : "job_type",
        "Majors" : "major",
        "Departments" : "categories",
        "Locations" : "location_prefs"
    }
    for(let i = 0; i < data.length; i++) {
        options.push(<div className={catName} style={{display: "none"}}><input type="checkbox" value={data[i][0]} onChange={updateFilter}/><label>{data[i][1]}</label></div>)
    }

    function updateFilter(e) {
        onChange(e.target.value, catToKeyMap[name], e.target.checked);
    }

    const ToggleCheckboxes = () => {
        console.log(catName);
        const checkboxes = document.getElementsByClassName(catName);
        for(var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].style.display = !showCategory ? "block" : "none";
        }
        setShowCategory(!showCategory)
    }
    return (
        <div className="filter-category">
            <div className="category-title">
                <span className="category-name"><strong>{name}</strong></span>
                <button onClick={ToggleCheckboxes}>{showCategory ? <MdOutlineExpandMore  /> : <MdOutlineArrowForwardIos size={8} />}</button>
            </div>
            
            <div className="category-options">
                {options}
            </div>
            <div className="side-divider"></div>
            
        </div>
        
    );

} export default FilterCategory;

