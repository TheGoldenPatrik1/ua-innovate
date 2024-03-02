import StudentRow from '../HRPortal/StudentRow';
import Sidebar from '../HRPortal/Sidebar';

function HRPortal() {
    return (
        <div class="portal">
          <Sidebar />
          <div id="main">
            <h1>HR Portal</h1>
            <input type="text" placeholder="search"/>
            <StudentRow name="Arden" email="something@example.com"/>
            <StudentRow name="Malachi" email="something@example.com"/>
            <StudentRow name="Sam" email="something@example.com"/>
            <StudentRow name="Logan" email="something@example.com"/>
          </div>
          
        </div>
        
      );
}
export default HRPortal;