import React,{useEffect,useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function StudentDashboard(){

 const [tests,setTests] = useState([]);
 const navigate = useNavigate();

 const token = localStorage.getItem("token");

 // ================= LOAD TESTS =================
 useEffect(()=>{

   axios.get("http://localhost:8080/tests/all", {
     headers: {
       Authorization: "Bearer " + token
     }
   })
   .then(res=>{
      setTests(res.data);
   })
   .catch(()=>{
      alert("Failed to load tests");
   });

 },[token]);

 // ================= START TEST =================
 const startTest = (testId) => {

   const studentId = localStorage.getItem("userId");

   axios.get(`http://localhost:8080/submit/result/${studentId}/${testId}`, {
     headers: {
       Authorization: "Bearer " + token
     }
   })
   .then(res => {

     if(res.data){
       alert("You already attempted.\nScore: " + res.data.score);
     } else {
       navigate("/test/" + testId);
     }

   })
   .catch(()=>{
     alert("Error checking attempt");
   });

 };

 return(

  <div>

   <h2>Student Dashboard</h2>

   <h3>Available Tests</h3>

   {tests.map((t)=>(
     <div key={t.id}>
       {t.title} - {t.duration} minutes
       <button onClick={()=>startTest(t.id)}>
        Start Test
       </button>
     </div>
   ))}

  </div>

 )

}

export default StudentDashboard;