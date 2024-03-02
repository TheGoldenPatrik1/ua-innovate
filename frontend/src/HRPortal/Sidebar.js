import "./Sidebar.css"
import FilterCategory from "./FilterCategory";

function Sidebar() {
    const filterCategories = getFilterCategories();
    const filterDivs = [];
    for(let i = 0; i < filterCategories.length; i++) {
        filterDivs.push(<FilterCategory />)
    }
    return(
        <div class="sidebar">
            <h2>Filters</h2>
            {filterDivs}
            <div class="filter-category">
                <span>Job Type</span>
                <button onclick="ToggleJobType()">|</button>
            </div>
            
            <input type="checkbox" /><label>{getIntern()}</label> <br />
            <input type="checkbox" /><label>Full-time</label> <br />
            <p>Location by State</p>
            <input type="checkbox" /><label>AL</label> <br />
            <input type="checkbox" /><label>Full-time</label> <br />
            <p>Major</p>
            <p>Department</p>
            <p>Graduation Date</p>
        </div>
    );
} export default Sidebar;

function getIntern() {
    return "Intern";
}

function ToggleJobType() {

}

function getFilterCategories() {
    const categories = {};
    categories["Job Type"] = ["Full time", "Intern"];
    categories["Location"] = ["AL", "GA", "MS"];
    categories["Major"] = ["CS", "MIS", "Bizness"];
    return categories;
}