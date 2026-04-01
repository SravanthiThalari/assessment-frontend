import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";

function Login() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8080/users/login", login)
      .then(res => {

        if (!res.data || !res.data.token) {
          alert(res.data || "Invalid credentials");
          return;
        }

        const token = res.data.token;
        const user = res.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);

        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/student");
        }

      })
      .catch(() => {
        alert("Login failed");
      });
  };
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
            Welcome Back 👋
          </Typography>

          <Typography
            align="center"
            sx={{ color: "gray", mb: 2 }}
          >
            Login to continue
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2.5}
          >

            <TextField
              label="Email"
              name="email"
              type="email"
              value={login.email}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={login.password}
              onChange={handleChange}
              required
              fullWidth
            />

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
              Login
            </Button>

          </Box>

        </CardContent>

      </Card>

    </Container>

  </Box>

);
}

export default Login;