import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Apply from "./component/Apply";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Sidenav from "./component/Sidenav";
import Signin from "./component/Signin";
import PageNotFound from "./component/PageNotFound";
import Dashboard from "./component/Admin/Dashboard";
import AddEmployee from "./component/Admin/AddEmployee";
import ViewEmployee from "./component/Admin/ViewEmployee";
import ViewApplication from "./component/Admin/ViewApplications";
import AssignWork from "./component/Admin/AssignWork";
import WorkStatus from "./component/Admin/WorkStatus";
import EmployeeDashboard from "./component/Employee/EmployeeDashboard";
import ChnagePassword from "./component/Employee/ChnagePassword";
import UpdateName from "./component/Employee/UpdateName";
import EmployeeWorkStatus from "./component/Employee/EmployeeWorkStatus";
import AddPhoto from "./component/Employee/AddPhoto";
import ViewEmployeeProfile from "./component/Employee/ViewEmployeeProfile";
import TopNav from "./component/TopNav";

function App() {
  const [logged,setLogged] = useState(false)
  return (
    <BrowserRouter>
      <div className="row">
        <Sidenav logged={logged} setLogged={setLogged}/>
        <div className="topNav">
          <div className="nav">
            <TopNav logged={logged} setLogged={setLogged}/>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Signin setLogged={setLogged}/>} />
            <Route exact path="/apply" element={<Apply />} />
            {/* admin */}
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/view/applications" element={<ViewApplication />} />
            <Route exact path="/admin/give/work" element={<AssignWork />} />
            <Route exact path="/admin/work/status" element={<WorkStatus />} />
            <Route exact path="/admin/add/employee" element={<AddEmployee />} />
            <Route exact path="/admin/view/employee" element={<ViewEmployee />} />
            {/* employee */}
            <Route exact path="/employee/dashboard" element={<EmployeeDashboard />} />
            <Route exact path="/employee/change/work" element={<EmployeeWorkStatus />} />
            <Route exact path="/employee/change/photo" element={<AddPhoto />} />
            <Route exact path="/employee/change/name" element={<UpdateName />} />
            <Route exact path="/employee/change/password" element={<ChnagePassword />} />

            <Route exact path="/employee/profile/:empId" element={<ViewEmployeeProfile />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;
