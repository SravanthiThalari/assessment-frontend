import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TestPage from "./TestPage";
import AddQuestion from "./AddQuestion";
import StudentResults from "./StudentResults";


import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App(){

 return(

  <BrowserRouter>

   {/* Navbar visible everywhere except login/register */}
   <Navbar/>

   <Routes>

    <Route path="/" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>

    <Route path="/admin" element={
      <ProtectedRoute>
        <AdminDashboard/>
      </ProtectedRoute>
    }/>

    <Route path="/student" element={
      <ProtectedRoute>
        <StudentDashboard/>
      </ProtectedRoute>
    }/>

    <Route path="/test/:id" element={
      <ProtectedRoute>
        <TestPage/>
      </ProtectedRoute>
    }/>

    <Route path="/addQuestion/:id" element={
      <ProtectedRoute>
        <AddQuestion/>
      </ProtectedRoute>
    }/>

    <Route path="/results" element={
      <ProtectedRoute>
        <StudentResults/>
      </ProtectedRoute>
    }/>

   </Routes>

  </BrowserRouter>

 )

}

export default App;