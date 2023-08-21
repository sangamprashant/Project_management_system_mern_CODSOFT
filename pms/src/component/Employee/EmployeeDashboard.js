import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

  const [workCounts, setWorkCounts] = useState({ Pending: 0, Done: 0, Canceled:0});
  const [userId,setUserId] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve user data from local storage when the component mounts
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if(!storedUserData||storedUserData.type!=="employee"){
      navigate("/signin")
    }else{
        setUserId(storedUserData._id)
    }
  }, []);

  useEffect(() => {
// Fetch worjkorder count when the component mounts
      axios.get(`http://localhost:5000/api/user/work/count/${userId}`)
      .then((response) => {
        setWorkCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });
  }, [userId]);
  return (
    <div className="admin_dashboard">
    <h5>Employee Dashboard</h5>
      <div className="row">
        <div className="user_item">
          <div className="card ">
            <h5 className="dashboard_item_count">{workCounts.Pending}</h5>
            <p className="dashboard_item_label">No.of Pending Work</p>
          </div>
        </div>
        <div className="user_item">
          <div className="card ">
            <h5 className="dashboard_item_count">{workCounts.Done}</h5>
            <p className="dashboard_item_label">No.of Completed Work</p>
          </div>
        </div>
        <div className="user_item">
          <div className="card ">
            <h5 className="dashboard_item_count">{workCounts.Canceled}</h5>
            <p className="dashboard_item_label">No.of Canceled Work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
