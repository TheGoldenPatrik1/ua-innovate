import "../styles/StudentHome.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function() {
	const steps = ['Pending Review', 'First Round', 'Final Round', 'Offer Sent', 'Hired']
	const [complete, setComplete] = useState(steps.indexOf('Final Round'))

	const navigate = useNavigate()
	const editButton = () => {
		// navigate to student home
		navigate('/student/app')
	}
	const deleteButton = () => {
		const confirmDelete = window.confirm('Are you sure you want to delete your application?');
		// navigate to student home
		if (confirmDelete) navigate('/')
	}

    return (
        <div className="back">
			<div className="application-form">
				<h1 className="test">Candidate Home</h1>
				<h3 style={{textAlign: 'center'}}>Application Progress</h3>
					<div className="divider"></div>
					<div id="stepProgressBar">
					{steps.map((v, i) => {
						return (
							<div className="step">
								<p>{v}</p>
								<div className={"bullet" + (i <= complete ? " completed" : "")}>{i + 1}</div>
							</div>
						)
					})}
					</div>
					<div className="step">
					<br></br>
					<h3>Thank you for applying to CGI! We will get back to you shortly.</h3>
					</div>
					<div class="button-container">
						<button class="styled-button-blue" onClick={editButton}>Edit Application</button>
						<div class="spacer"></div>
						<button class="styled-button-red" onClick={deleteButton}>Delete Application</button>
					</div>
			</div>
        </div>
    )
}