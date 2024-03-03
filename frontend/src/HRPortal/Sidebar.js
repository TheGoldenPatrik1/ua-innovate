import "../styles/Sidebar.css"
import FilterCategory from "./FilterCategory";

function Sidebar({visible}) {
    const filterCategories = getFilterCategories();
    const filterDivs = [];
    for (const [key, value] of Object.entries(filterCategories)) {
        filterDivs.push(<FilterCategory name={key} data={value}/>)
    }
    return(
        <div class="sidebar" style={visible ? {display:"block"} : {display: "none"}}>
            <h2>Filters</h2>
            {filterDivs}
        </div>
        
    )
} export default Sidebar;


function getFilterCategories() {
    const categories = {};
    categories["Job Type"] = ["Full time", "Intern"];
    categories["Location"] = ["AL", "GA", "MS"];
    categories["Major"] = ["CS", "MIS", "Bizness"];
    return categories;
}