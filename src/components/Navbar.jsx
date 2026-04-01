import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import API from "./api";
function Navbar(){

 const navigate = useNavigate();
 const location = useLocation();

 const role = localStorage.getItem("role");

 // 🚫 Hide Navbar on Register & Login pages
 if(location.pathname === "/" || location.pathname === "/login"){
  return null;
 }

 const logout = ()=>{
  localStorage.clear();
  navigate("/login");
 };

 return(

  <AppBar position="static" style={{ background: "#1976d2" }}>

   <Toolbar>

    {/* Title */}
    <Typography variant="h6" style={{ flexGrow: 1 }}>
      Online Assessment System
    </Typography>

    {/* Admin Button */}
    {role === "ADMIN" && (
      <Button color="inherit" onClick={()=>navigate("/admin")}>
        Admin Dashboard
      </Button>
    )}

    {/* Student Button */}
    {role === "STUDENT" && (
      <Button color="inherit" onClick={()=>navigate("/student")}>
        Student Dashboard
      </Button>
    )}

    {/* Results */}
    <Button color="inherit" onClick={()=>navigate("/results")}>
      Results
    </Button>

    {/* Logout */}
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>

   </Toolbar>

  </AppBar>

 );

}

export default Navbar;