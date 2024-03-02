import "../styles/StudentHome.css"

export default function() {
    return (
        <div>
            <h2>Candidate Home</h2>
            <h3 style={{textAlign: 'center'}}>Application Progress</h3>
            <div id="stepProgressBar">
	            <div className="step">
		            <p className="step-text">Pending Review</p>
		            <div className="bullet completed">1</div>
	            </div>
	            <div className="step">
		            <p className="step-text">First Round</p>
		            <div className="bullet completed">2</div>
	            </div>
	            <div className="step">
		            <p className="step-text">Final Round</p>
		            <div className="bullet completed">3</div>
	            </div>
	            <div className="step">
		            <p className="step-text">Offer Sent</p>
		            <div className="bullet completed">4</div>
	            </div>
                <div className="step">
		            <p className="step-text">Hired</p>
		            <div className="bullet">5</div>
	            </div>
            </div>
        </div>
    )
}