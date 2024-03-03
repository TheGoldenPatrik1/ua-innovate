import "../styles/Sidebar.css"
import FilterCategory from "./FilterCategory";
import { useEffect, useState } from "react";
import axios from "axios";

function Sidebar({visible}) {
    const [filterCategories, setFilterCategories] = useState([]);
    useEffect(() => {
        const fetchMajors = async () => {
            const response = await axios.get(`http://localhost:8080/api/majors`);
            filterCategories["Majors"] = response.data.map(v =>  [v._id, v.major]);
            setFilterCategories(filterCategories);
        }
        const fetchDepartments = async () => {
            const response = await axios.get(`http://localhost:8080/api/categories`);
            filterCategories["Departments"] = response.data.map(v =>  [v._id, v.category]);
            setFilterCategories(filterCategories);
        }
        const fetchLocations = async () => {
            const response = await axios.get(`http://localhost:8080/api/locations`);
            filterCategories["Locations"] = response.data.map(v =>  [v._id, v.city + ", " + v.state]);
            setFilterCategories(filterCategories);
        }

        fetchMajors();
        fetchDepartments();
        fetchLocations();

        filterCategories["Job Type"] = [["Full-Time", "Full-Time"], ["Internship", "Internship"]];
        setFilterCategories(filterCategories);
    }, []);
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