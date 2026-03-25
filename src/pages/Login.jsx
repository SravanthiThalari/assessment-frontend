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

    <Container maxWidth="sm" style={{ marginTop: "80px" }}>

      <Card elevation={6} style={{ borderRadius: "15px" }}>
        <CardContent>

          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={3}
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
              style={{
                background: "linear-gradient(45deg, #ff6a00, #ee0979)",
                color: "white",
                fontWeight: "bold"
              }}
            >
              Login
            </Button>

          </Box>

        </CardContent>
      </Card>

    </Container>
  );
}

export default Login;