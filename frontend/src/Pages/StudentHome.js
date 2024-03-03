import "../styles/StudentHome.css"
import { useNavigate } from "react-router-dom";



export default function() {
	const navigate = useNavigate()
	const editButton = () => {
		// navigate to student home
		navigate('/student/app')
	}
	const deleteButton = () => {
		var confirmDelete = window.confirm('Are you sure you want to delete?');
		// navigate to student home
		if (confirmDelete){
		navigate('/');
		}
	}
    return (
        <div className="back">
			<div className="application-form">
				<h1 className="test">Candidate Home</h1>
				<h3 style={{textAlign: 'center'}}>Application Progress</h3>
					<div className="divider"></div>
					<div id="stepProgressBar">
					<div className="step">
						<p>Pending Review</p>
						<div className="bullet completed">1</div>
					</div>
					<div className="step">
						<p>First Round</p>
						<div className="bullet completed">2</div>
					</div>
					<div className="step">
						<p>Final Round</p>
						<div className="bullet">3</div>
					</div>
					<div className="step">
						<p>Offer Sent</p>
						<div className="bullet">4</div>
					</div>
					<div className="step">
						<p>Hired</p>
						<div className="bullet">5</div>
					</div>
					</div>
					<div className="step">
					<br></br>
					<h3>Thank you for applying to CGI! We will get back to you shortly</h3>
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