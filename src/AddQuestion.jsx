import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddQuestion(){

 const { id } = useParams();

 const [question,setQuestion] = useState({
  question:"",
  optionA:"",
  optionB:"",
  optionC:"",
  optionD:"",
  correctAnswer:""
 });

 const handleChange = (e)=>{
  setQuestion({...question,[e.target.name]:e.target.value});
 };

 const submitQuestion = (e)=>{
  e.preventDefault();

  const data = {
   ...question,
   testId:id,
   type:"MCQ"
  };

  axios.post("http://localhost:8080/questions/add",data)
  .then(res=>{
   alert("Question Added Successfully");

   setQuestion({
    question:"",
    optionA:"",
    optionB:"",
    optionC:"",
    optionD:"",
    correctAnswer:""
   });

  })
  .catch(err=>{
   console.log(err);
   alert("Error adding question");
  });

 };

 return(

  <div>

   <h2>Add Question for Test {id}</h2>

   <form onSubmit={submitQuestion}>

    <input
     name="question"
     placeholder="Enter Question"
     value={question.question}
     onChange={handleChange}
    />

    <br/><br/>

    <input
     name="optionA"
     placeholder="Option A"
     value={question.optionA}
     onChange={handleChange}
    />

    <br/><br/>

    <input
     name="optionB"
     placeholder="Option B"
     value={question.optionB}
     onChange={handleChange}
    />

    <br/><br/>

    <input
     name="optionC"
     placeholder="Option C"
     value={question.optionC}
     onChange={handleChange}
    />

    <br/><br/>

    <input
     name="optionD"
     placeholder="Option D"
     value={question.optionD}
     onChange={handleChange}
    />

    <br/><br/>

    <input
     name="correctAnswer"
     placeholder="Correct Answer (A/B/C/D)"
     value={question.correctAnswer}
     onChange={handleChange}
    />

    <br/><br/>

    <button type="submit">
     Add Question
    </button>

   </form>

  </div>

 );

}

export default AddQuestion;