import "../styles/StudentHome.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function() {
	const params = new URLSearchParams(window.location.search)
	const userID = params.get("id")

	const steps = ['Pending Review', 'First Round', 'Final Round', 'Offer Sent', 'Hired']
	const [complete, setComplete] = useState(0)
	const [userData, setUserData] = useState({})
	
	useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get(`http://localhost:8080/api/students/${userID}`)
			console.log(response.data)
			setUserData(response.data)
            setComplete(steps.indexOf(response.data.interview_status))
        }
        
        if (userID) fetchStudent();
    }, []);

	const navigate = useNavigate()
	const editButton = () => {
		// navigate to student home
		navigate('/student/app?id=' + userID)
	}
	const deleteButton = () => {
		const confirmDelete = window.confirm('Are you sure you want to delete your application?');
		// navigate to student home
		if (confirmDelete) {
			axios.delete(`http://localhost:8080/api/students/${userID}`).then(r => {
				axios.delete(`http://localhost:8080/api/users/${userData.email}`).then(r => {
					navigate('/?action=delete')
				}).catch(e => {
					console.log(e)
					alert('Something went wrong in deleting your user account')
				})
			}).catch(e => {
				console.log(e)
				alert('Something went wrong in deleting your student account')
			})
		}
	}
	const logoutButton = () => {
		navigate('/?action=logout')
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
					<h3>{userData.fname ? `${userData.fname}, t` : 'T'}hank you for applying to CGI! We will get back to you shortly.</h3>
					</div>
					<div class="button-container">
						<button class="styled-button blue" onClick={editButton}>Edit Application</button>
						<div class="spacer"></div>
						<button class="styled-button red" onClick={deleteButton}>Delete Application</button>
					</div>
					<br></br>
					<div class="button-container">
						<button class="styled-button white" onClick={logoutButton}>Logout</button>
					</div>
			</div>
        </div>
    )
}