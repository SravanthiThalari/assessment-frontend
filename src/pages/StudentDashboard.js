import React,{useEffect,useState} from "react";
import axios from "axios";
import API from "../api";
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

return (
  <div className="container">

    <h2>Student Dashboard</h2>

    <div className="card">
      <h3>Available Tests</h3>

      <div className="grid">
        {tests.map((t) => (
          <div key={t.id} className="test-card">

            <h4>{t.title}</h4>

            <p className="duration">
              ⏱ {t.duration} minutes
            </p>

            <button
              className="btn-start"
              onClick={() => startTest(t.id)}
            >
              Start Test
            </button>

          </div>
        ))}
      </div>

    </div>

  </div>
);
}

export default StudentDashboard;