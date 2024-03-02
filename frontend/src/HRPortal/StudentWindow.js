import React, {useState} from 'react'
import './StudentWindow.css';

class StudentWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        }
    }
    onClose = (event) => {
        this.props.parentCallback(false);
        event.preventDefault();
    }
    render() {
        return (
            <div class="student-window" style={this.state.visible ? {display: "block"} : {display: "none"}}>Hello</div>
        );
    }
    

} export default StudentWindow;