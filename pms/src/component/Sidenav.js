import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Sidenav({ logged , setLogged }) {
  const navigate = useNavigate();

  const handelLogout = async () => {
    localStorage.clear();
    setLogged(false)
    toast.success("Logged out successfully.")
    navigate("/signin");
  };

  const renderNavigationOptions = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
  
    if (logged||storedUserData) {
      if(storedUserData.type=="admin"){
      return(
        <>
          {/* admin */}
          <li className="option" onClick={() => navigate("/admin/dashboard")}>
            <a>Admin Dashboard</a>
          </li>
          <li className="option" onClick={() => navigate("/admin/view/applications")}>
            <a>View Application</a>
          </li>
          <li className="option" onClick={() => navigate("/admin/give/work")}>
            <a>Assign Work</a>
          </li>
          <li className="option" onClick={() => navigate("/admin/work/status")}>
            <a>Work Status</a>
          </li>
          <li className="option" onClick={() => navigate("/admin/add/employee")}>
            <a>Add Employee</a>
          </li>
          <li className="option" onClick={() => navigate("/admin/view/employee")}>
            <a>View Employee</a>
          </li>
          <li className="option" onClick={handelLogout}>
            <a>Logout</a>
          </li>
        </>
      )
      }if(storedUserData.type=="employee"){
        return(<>
          {/* Employee */}
          <li className="option" onClick={() => navigate(`/employee/profile/${storedUserData._id}`)}>
            <a>Employee Profile</a>
          </li>
          <li className="option" onClick={() => navigate("/employee/change/work")}>
            <a>Work Order</a>
          </li>
          <li className="option" onClick={() => navigate("/employee/change/photo")}>
            <a>Change Photo</a>
          </li>
          <li className="option" onClick={() => navigate("/employee/change/name")}>
            <a>Change Name</a>
          </li>
          <li className="option" onClick={() => navigate("/employee/change/password")}>
            <a>Change Password</a>
          </li>
          <li className="option" onClick={handelLogout}>
            <a>Logout</a>
          </li>
        </>)
      }
    }else{
      return (
        <>
          <li className="option" onClick={() => navigate("/signin")}>
            <a>Signin</a>
          </li>
          <li className="option" onClick={() => navigate("/apply")}>
            <a>Apply</a>
          </li>
        </>
      );
    }
  };

  return (
    <div className="sideNav container_to_hide mobile_control">
      <ul className="container">
        <div onClick={() => navigate("/")}>
          <h5 className="title">💼 PMS</h5>
        </div>
        {renderNavigationOptions()} {/* Call the function to render JSX */}
      </ul>
    </div>
  );
}

export default Sidenav;
