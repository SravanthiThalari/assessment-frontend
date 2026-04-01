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

return (

  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(to right, #eef2ff, #f5f7fb)"
    }}
  >

    <Container maxWidth="sm">

      <Card
        elevation={10}
        sx={{
          borderRadius: "20px",
          p: 3
        }}
      >

        <CardContent>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={submit}
            display="flex"
            flexDirection="column"
            gap={2.5}
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
              sx={{
                mt: 1,
                borderRadius: "10px",
                fontWeight: "bold",
                textTransform: "none",
                background: "linear-gradient(45deg, #4f46e5, #6366f1)",
                ":hover": {
                  background: "linear-gradient(45deg, #4338ca, #4f46e5)"
                }
              }}
            >
              Register
            </Button>

          </Box>

        </CardContent>

      </Card>

    </Container>

  </Box>

);

}

export default Register;