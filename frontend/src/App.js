import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Userpage from "./Pages/Userpage.jsx";
import Userprofile from "./Pages/Userprofile.jsx";
import EditProfile from "./Pages/Edituserprofile.jsx";
import UploadImagePage  from "./Pages/Uploadimage.jsx";
import ImageEdit from "./Pages/ImageEdit.jsx";
import UserPolicy from "./Pages/Policy/UserPolicy.jsx";
import RemoveBackground from "./Pages/RemoveBackground.jsx";

import Employeepage from "./Pages/Employeepage.jsx";
import EmployeeChart from "./Pages/EmployeeChart.jsx";
import AddPolicy from "./Pages/Policy/AddPolicy.jsx";
import EditPolicy from "./Pages/Policy/Editpolicy.jsx";
import EditPolicyForm from "./Pages/Policy/EditPolicyForm.jsx";

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
        <Route path="/uploadimage" element={<UploadImagePage  />} />
        <Route path="/editimage" element={<ImageEdit />} />
        <Route path="/userpolicy" element={<UserPolicy />} />
        <Route path="/removebackground" element={<RemoveBackground />} />

        <Route path="/employeepage" element={<Employeepage />} />
        <Route path="/chartpage" element={<EmployeeChart />} />
        <Route path="/addpolicy" element={<AddPolicy />} />
        <Route path="/editpolicy" element={<EditPolicy />} />
        <Route path="/editpolicyform/:id" element={<EditPolicyForm />} />

        
      </Routes>
    </Router>
  );
}

export default App;
