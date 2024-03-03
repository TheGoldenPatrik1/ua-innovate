import React, { useState } from "react";
import "../styles/StudentData.css"

function StudentData({num, student, parentCallback}) {

    const openStudentWindow = () => {
        parentCallback(num);
    }

        return (
            <tr class="student-row" onClick={openStudentWindow}>
                <td className="student-field"><span class="student-name">{`${student.lname}, ${student.fname}`}</span></td>
                <td className="student-field"><span class="student-grad-date">{student.grad_date}</span></td>
                <td className="student-field"><span class="student-status">{student.interview_status}</span></td>
                <td className="student-field"><span class="student-tech-score">{student.technical_score || 'N/A'}</span></td>
                <td className="student-field"><span class="student-behavior-score">{student.behavioral_score || 'N/A'}</span></td>
            </tr>
            
        );
    
    
} export default StudentData;