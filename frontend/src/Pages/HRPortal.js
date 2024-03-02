import StudentData from '../HRPortal/StudentData';
import Sidebar from '../HRPortal/Sidebar';
import "./HRPortal.css"

function HRPortal() {
    const students = GetStudents();
    const studentElements = [];
    for(var i = 0; i < students.length; i++) {
        studentElements.push(<StudentData student={students[i]}/>)
    }
    return (
        <div class="portal">
          <Sidebar />
          <div id="main">
            <h1>HR Portal</h1>
            <input type="text" placeholder="search"/>
            <div id="student-table">
                {/*TODO: figure out how to include table headers later */}
                {/* <div>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Rating 1</span>
                    <span>Rating 2</span>
                    <span>Rating 3</span>
                </div> */}
                
        
                {studentElements}
            </div>
            
            
          </div>
          
        </div>
        
      );
}
export default HRPortal;

//Gets students from backend
function GetStudents() {
    var students = [];
    for(var i = 0; i < 5; i++) {
        students.push({
            name: "Student " + i,
            email: "something@example.com",
            major: "CS",
            school: "School " + i,
            rating1: Math.floor(Math.random() * 5),
            rating2: Math.floor(Math.random() * 5),
            rating3: Math.floor(Math.random() * 5)
        });
    }
    return students;
}