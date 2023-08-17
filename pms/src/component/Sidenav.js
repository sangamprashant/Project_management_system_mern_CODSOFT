import React from "react";
import { Link,useNavigate } from "react-router-dom";

function Sidenav() {
  const navigate =useNavigate();
  const handelLogout = async () => {
    localStorage.clear();
    navigate("/signin")
  }
  return (
      <div className="sideNav container_to_hide">
        <ul className="container">
          <div onClick={()=>{navigate("/")}}>
            <h5>Logo here</h5>
          </div>
          <li className="option" onClick={()=>{navigate("/signin")}}><a >Signin</a></li>
          <li className="option" onClick={()=>{navigate("/apply")}}><a >Apply</a></li>
          {/* admin */}
          <li className="option" onClick={()=>{navigate("/admin/dashboard")}}><a >Admin Dashboard</a></li>
          <li className="option" onClick={()=>{navigate("/admin/view/applications")}}><a >View Application</a></li>
          <li className="option" onClick={()=>{navigate("/admin/add/employee")}}><a >Add Employee</a></li>
          <li className="option" onClick={()=>{navigate("/admin/view/employee")}}><a >View Employee</a></li>
          <li className="option" onClick={()=>{handelLogout()}}><a >Logout</a></li>
        </ul>
      </div>
  );
}

export default Sidenav;
