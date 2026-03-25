import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box
} from "@mui/material";

function Register(){

 const [data,setData] = useState({
  name:"",
  email:"",
  password:"",
  role:"STUDENT"
 });

 const changeData=(e)=>{
  setData({...data,[e.target.name]:e.target.value});
 }

 const submit=(e)=>{
  e.preventDefault();

  axios.post("http://localhost:8080/users/register",data)

  .then(res=>{
    alert("Registration Successful");
    window.location="/login";
  })

  .catch(err=>{
    console.log(err);
    alert("Registration Failed");
  });

 }

 return(

  <Container maxWidth="sm" style={{ marginTop: "60px" }}>

   <Card
     elevation={6}
     style={{
       borderRadius: "15px",
       padding: "10px"
     }}
   >

    <CardContent>

     <Typography
       variant="h4"
       align="center"
       gutterBottom
       style={{ fontWeight: "bold" }}
     >
       Register
     </Typography>

     <Box
       component="form"
       onSubmit={submit}
       display="flex"
       flexDirection="column"
       gap={3}
     >

      <TextField
        label="Full Name"
        name="name"
        value={data.name}
        onChange={changeData}
        required
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={data.email}
        onChange={changeData}
        required
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={data.password}
        onChange={changeData}
        required
        fullWidth
      />

      <TextField
        select
        label="Role"
        name="role"
        value={data.role}
        onChange={changeData}
        fullWidth
      >
        <MenuItem value="STUDENT">Student</MenuItem>
        <MenuItem value="ADMIN">Admin</MenuItem>
      </TextField>

      <Button
        type="submit"
        variant="contained"
        size="large"
        style={{
          background: "linear-gradient(45deg, #2196F3, #21CBF3)",
          color: "white",
          fontWeight: "bold"
        }}
      >
        Register
      </Button>

     </Box>

    </CardContent>

   </Card>

  </Container>

 )

}

export default Register;