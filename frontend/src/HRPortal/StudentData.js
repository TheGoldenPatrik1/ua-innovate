import React, { useState } from "react";
import "./StudentData.css"

function StudentData({student}) {
    const [visible, setVisible] = useState(false);
    function toggleStudentWindow() {
        setVisible(!visible);
    }
    return (
        <div class="student-row" onClick={toggleStudentWindow}>
            <span class="student-field student-name">{student.name}</span>
            <span class="student-field student-email">{student.email}</span>
            <span class="student-field student-rating1">{student.rating1}</span>
            <span class="student-field student-rating2">{student.rating2}</span>
            <span class="student-field student-rating3">{student.rating3}</span>
            {visible ===true && (
                <div class="student-modal">
                    <div class="student-modal-content">
                        <div class="student-modal-header">
                            <span class="close" id="student-modal-close" onClick={toggleStudentWindow}>&times;</span>
                            <h2>{student.name}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    );
} export default StudentData;