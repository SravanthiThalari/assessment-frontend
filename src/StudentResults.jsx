import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StudentResults(){

 const [results,setResults] = useState([]);

 const studentId = localStorage.getItem("userId");

 useEffect(()=>{

  axios.get(`http://localhost:8080/submit/student/${studentId}`)
  .then(res=>{
    setResults(res.data);
  })
  .catch(err=>{
    console.log(err);
  });

 },[studentId]);

 // 📊 Prepare chart data
 const chartData = {
  labels: results.map((r, index) => "Test " + r.testId),
  datasets: [
    {
      label: "Score",
      data: results.map(r => r.score),
    }
  ]
 };

 return(

  <Container maxWidth="md" style={{ marginTop: "30px" }}>

   <Typography variant="h4" align="center" gutterBottom>
     My Results Dashboard
   </Typography>

   {/* Chart */}
   <Card style={{ marginBottom: "20px" }}>
    <CardContent>
      <Bar data={chartData}/>
    </CardContent>
   </Card>

   {/* Result List */}
   {results.map((r)=>(
     <Card key={r.id} style={{ marginBottom: "10px" }}>
       <CardContent>

         <Typography>
           <b>Test ID:</b> {r.testId}
         </Typography>

         <Typography>
           <b>Score:</b> {r.score}
         </Typography>

         <Typography>
           <b>Total Questions:</b> {r.totalQuestions}
         </Typography>

         <Typography>
           <b>Submitted At:</b> {r.submittedAt}
         </Typography>

       </CardContent>
     </Card>
   ))}

  </Container>

 );

}

export default StudentResults;