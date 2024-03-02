import "./StudentRow.css"

function StudentRow( {name, email}) {
    return (
        <div class="student-row">
            <span class="student-name">{name}</span>
            <span class="student-email">{email}</span>
        </div>
    );

} export default StudentRow;