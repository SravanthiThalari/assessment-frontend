import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard(){

 const navigate = useNavigate();

 const [test,setTest] = useState({
   title:"",
   duration:""
 });

 const [tests,setTests] = useState([]);
 const [submissions,setSubmissions] = useState([]);

 const [editId,setEditId] = useState(null); // ⭐ NEW

 // ================= CREATE / UPDATE =================
 const handleChange=(e)=>{
   setTest({...test,[e.target.name]:e.target.value});
 }

 const saveTest=(e)=>{
   e.preventDefault();

   if(editId){
     // 🔁 UPDATE
     axios.put(`http://localhost:8080/tests/update/${editId}`,test)
     .then(()=>{
        alert("Test Updated Successfully");
        setEditId(null);
        setTest({ title:"", duration:"" });
        loadTests();
     });
   } else {
     // ➕ CREATE
     axios.post("http://localhost:8080/tests/create",test)
     .then(()=>{
        alert("Test Created Successfully");
        loadTests();
        setTest({ title:"", duration:"" });
     })
     .catch(()=>{
        alert("Error creating test");
     });
   }
 }

 // ================= LOAD =================
 const loadTests = ()=>{
   axios.get("http://localhost:8080/tests/all")
   .then(res=>{
      setTests(res.data);
   });
 }

 const loadSubmissions = ()=>{
   axios.get("http://localhost:8080/submit/all")
   .then(res=>{
      setSubmissions(res.data);
   });
 }

 useEffect(()=>{
   loadTests();
   loadSubmissions();
 },[]);

 // ================= ACTIONS =================
 const addQuestions=(id)=>{
   navigate("/addQuestion/"+id);
 }

 const handleEdit = (t) => {
   setTest({
     title: t.title,
     duration: t.duration
   });
   setEditId(t.id);
 };

 const handleDelete = (id) => {
   if(window.confirm("Are you sure you want to delete this test?")){
     axios.delete(`http://localhost:8080/tests/delete/${id}`)
     .then(()=>{
        alert("Test Deleted");
        loadTests();
     });
   }
 };

 // ================= LEADERBOARD =================
 const sortedSubmissions = [...submissions].sort((a,b)=>b.score - a.score);

 return(

  <div>

   <h2>Admin Dashboard</h2>

   {/* CREATE / UPDATE TEST */}

   <h3>{editId ? "Update Test" : "Create Test"}</h3>

   <form onSubmit={saveTest}>

    <input
     type="text"
     name="title"
     placeholder="Enter Test Title"
     value={test.title}
     onChange={handleChange}
    />

    <br/><br/>

    <input
     type="number"
     name="duration"
     placeholder="Duration (minutes)"
     value={test.duration}
     onChange={handleChange}
    />

    <br/><br/>

    <button type="submit">
      {editId ? "Update Test" : "Create Test"}
    </button>

   </form>

   <hr/>

   {/* EXISTING TESTS */}

   <h3>Existing Tests</h3>

   {tests.map((t)=>(
     <div key={t.id} style={{ marginBottom: "10px" }}>

       {t.title} - {t.duration} minutes

       <button onClick={()=>addQuestions(t.id)}>
        Add Questions
       </button>

       {/* ✏️ EDIT */}
       <button onClick={()=>handleEdit(t)}>
        Edit
       </button>

       {/* 🗑 DELETE */}
       <button onClick={()=>handleDelete(t.id)}>
        Delete
       </button>

     </div>
   ))}

   <hr/>

   {/* ALL RESULTS */}

   <h3>All Student Results</h3>

   {submissions.map((s)=>(
     <div key={s.id}>
       Student: {s.studentId} | Test: {s.testId} | Score: {s.score}
     </div>
   ))}

   <hr/>

   {/* LEADERBOARD */}

   <h3>Leaderboard 🏆</h3>

   {sortedSubmissions.slice(0,5).map((s,index)=>(
     <div key={s.id}>
       Rank {index+1} → Student {s.studentId} | Score: {s.score}
     </div>
   ))}

  </div>

 )

}

export default AdminDashboard;