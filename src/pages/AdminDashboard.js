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

 return (
  <div className="container">

    <h2>Admin Dashboard</h2>

    {/* CREATE / UPDATE TEST */}
    <div className="card">
      <h3>{editId ? "Update Test" : "Create Test"}</h3>

      <form onSubmit={saveTest} className="form-row">

        <input
          type="text"
          name="title"
          placeholder="Enter Test Title"
          value={test.title}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={test.duration}
          onChange={handleChange}
          className="input"
        />

        <button className="btn-primary" type="submit">
          {editId ? "Update" : "Create"}
        </button>

      </form>
    </div>

    {/* EXISTING TESTS */}
    <div className="card">
      <h3>Existing Tests</h3>

      <div className="grid">
        {tests.map((t) => (
          <div key={t.id} className="card-small">

            <h4>{t.title}</h4>
            <p>{t.duration} minutes</p>

            <div className="action-buttons">
              <button className="btn-primary" onClick={() => addQuestions(t.id)}>
                Add
              </button>

              <button className="btn-edit" onClick={() => handleEdit(t)}>
                Edit
              </button>

              <button className="btn-delete" onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>

    {/* STUDENT RESULTS TABLE */}
    <div className="card">
      <h3>All Student Results</h3>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student ID</th>
            <th>Test ID</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.studentId}</td>
              <td>{s.testId}</td>
              <td>{s.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* LEADERBOARD */}
    <div className="card">
      <h3>Leaderboard 🏆</h3>

      {sortedSubmissions.slice(0, 5).map((s, index) => {

        let rankClass = "rank-default";
        if (index === 0) rankClass = "rank-1";
        else if (index === 1) rankClass = "rank-2";
        else if (index === 2) rankClass = "rank-3";

        return (
          <div key={s.id} className={`leaderboard-item ${rankClass}`}>
            <strong>Rank {index + 1}</strong> |
            Student {s.studentId} |
            Score: {s.score}
          </div>
        );
      })}
    </div>

  </div>
);

}

export default AdminDashboard;