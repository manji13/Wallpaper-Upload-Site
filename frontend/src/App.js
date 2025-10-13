import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Userpage from "./Pages/Userpage.jsx";
import Userprofile from "./Pages/Userprofile.jsx";
import EditProfile from "./Pages/Edituserprofile.jsx";

import Employeepage from "./Pages/Employeepage.jsx";
import EmployeeChart from "./Pages/EmployeeChart.jsx";

function App() {
  return (
    <Router>
      
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/editprofile" element={<EditProfile />} />

        <Route path="/employeepage" element={<Employeepage />} />
        <Route path="/chartpage" element={<EmployeeChart />} />
        
      </Routes>
    </Router>
  );
}

export default App;
