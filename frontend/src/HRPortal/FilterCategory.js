import "../styles/FilterCategory.css"

function FilterCategory({name, data}) {
    var showCategory = false;
    const options = [];
    const catName = "category-" + name.replace(/\s/g, '');
    for(let i = 0; i < data.length; i++) {
        options.push(<div className={catName} style={{display: "none"}}><input type="checkbox"/><label>{data[i]}</label></div>)
    }

    const ToggleCheckboxes = () => {
        console.log(catName);
        const checkboxes = document.getElementsByClassName(catName);
        showCategory = !showCategory;
        for(var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].style.display = showCategory ? "block" : "none";
        }
    }
    return (
        <div className="filter-category">
            <div className="category-title">
                <span className="category-name">{name}</span>
                <button onClick={ToggleCheckboxes}>|</button>
            </div>
            
            <div className="category-options">
                {options}
            </div>
            
        </div>
        
    );

} export default FilterCategory;

