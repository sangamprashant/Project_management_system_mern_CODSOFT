import React from "react";
import { Link,useNavigate } from "react-router-dom";

function Sidenav() {
  const navigate =useNavigate();
  return (
      <div className="sideNav">
        <ul className="container">
          <div onClick={()=>{navigate("/")}}>
            <h5>Logo here</h5>
          </div>
          <li className="option" onClick={()=>{navigate("/signin")}}><a >Signin</a></li>
          <li className="option" onClick={()=>{navigate("/apply")}}><a >Apply</a></li>
          <li className="option" onClick={()=>{navigate("/admin/dashboard")}}><a >Admin Dashboard</a></li>
        </ul>
      </div>
  );
}

export default Sidenav;
