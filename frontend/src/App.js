import {Router, Routes , Route } from "react-router-dom" 
import Home from "./pages/Home" 
import StudentPortal from "./pages/StudentPortal" 
function App(){ 
   return ( 
        <Routes> 
            <Route path="/" element={<Home />} />
            <Route path="/studentPortal" element={<StudentPortal/> } /> 
       </Routes> 
)} 
export default App 