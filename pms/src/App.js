import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <div className="row">
        <Sidenav />
        <div className="topNav">
          <div className="nav">
            <h5 className="title">Project Management System</h5>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/apply" element={<Apply />} />
            {/* admin */}
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/view/applications" element={<ViewApplication />} />
            <Route exact path="/admin/add/employee" element={<AddEmployee />} />
            <Route exact path="/admin/view/employee" element={<ViewEmployee />} />

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
