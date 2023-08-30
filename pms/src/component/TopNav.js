import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function TopNav({ logged, setLogged }) {
  const navigate = useNavigate();

  const handelLogout = async () => {
    localStorage.clear();
    setLogged(false);
    toast.success("Logged out successfully.");
    navigate("/signin");
  };

  const renderNavigationOptions = () => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));

    if (logged || storedUserData) {
      if (storedUserData.type == "admin") {
        return (
          <>
            {/* admin */}
            <li
              className="option nav-item"
              onClick={() => navigate("/admin/dashboard")}
            >
              <a class="nav-link">Admin Dashboard</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/admin/view/applications")}
            >
              <a class="nav-link">View Application</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/admin/give/work")}
            >
              <a class="nav-link">Assign Work</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/admin/work/status")}
            >
              <a class="nav-link">Work Status</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/admin/add/employee")}
            >
              <a class="nav-link">Add Employee</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/admin/view/employee")}
            >
              <a class="nav-link">View Employee</a>
            </li>
            <li className="option nav-item" onClick={handelLogout}>
              <a class="nav-link cancel_text">Logout</a>
            </li>
          </>
        );
      }
      if (storedUserData.type == "employee") {
        return (
          <>
            {/* Employee */}
            <li
              className="option nav-item"
              onClick={() =>
                navigate(`/employee/profile/${storedUserData._id}`)
              }
            >
              <a class="nav-link">Employee Profile</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/employee/change/work")}
            >
              <a class="nav-link">Work Order</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/employee/change/photo")}
            >
              <a class="nav-link">Change Photo</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/employee/change/name")}
            >
              <a class="nav-link">Change Name</a>
            </li>
            <li
              className="option nav-item"
              onClick={() => navigate("/employee/change/password")}
            >
              <a class="nav-link">Change Password</a>
            </li>
            <li className="option nav-item" onClick={handelLogout}>
              <a class="nav-link cancel_text">Logout</a>
            </li>
          </>
        );
      }
    } else {
      return (
        <>
          <li className="option nav-item" onClick={() => navigate("/signin")}>
            <a class="nav-link">Signin</a>
          </li>
          <li className="option nav-item" onClick={() => navigate("/apply")}>
            <a class="nav-link">Apply</a>
          </li>
        </>
      );
    }
  };

  return (
    <div>
      <h5 className="title mobile_control">💼 Project Management System</h5>
      <nav class="navbar navbar-expand-lg mobile_control_topnev" style={{ width: "100%" }}>
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Project Management System
          </Link>
          <button
            class="navbar-toggler container_to_hide "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse container_to_hide"
            id="navbarNav"
          >
            <ul class="navbar-nav">{renderNavigationOptions()}</ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
