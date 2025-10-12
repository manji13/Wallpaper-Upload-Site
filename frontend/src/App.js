import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Userpage from "./Pages/Userpage.jsx";
import Employeepage from "./Pages/Employeepage.jsx";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/employeepage" element={<Employeepage />} />
      </Routes>
    </Router>
  );
}

export default App;
