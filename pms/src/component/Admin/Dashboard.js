import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {

  const [countUser,setCountUser] = useState(0);
  const [countApplications,setCountApplications] = useState(0)
  const [workCounts, setWorkCounts] = useState({ canceledCount: 0, remainingCount: 0 });

  useEffect(() => {
    // Fetch employee count when the component mounts
    axios.get("http://localhost:5000/api/employees/count")
      .then((response) => {
        setCountUser(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });
// Fetch applications count when the component mounts
      axios.get("http://localhost:5000/api/applications/count")
      .then((response) => {
        setCountApplications(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });
// Fetch worjkorder count when the component mounts
      axios.get("http://localhost:5000/api/workorders/count")
      .then((response) => {
        setWorkCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });
  }, []);
  return (
    <div className="admin_dashboard">
      <div className="row">
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">{countUser}</h5>
            <p className="dashboard_item_label">No.of Employee</p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">{countApplications}</h5>
            <p className="dashboard_item_label">No.of Application</p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">{workCounts.remainingCount}</h5>
            <p className="dashboard_item_label">No.of Pending Work</p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">{workCounts.canceledCount}</h5>
            <p className="dashboard_item_label">No.of Completed Work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
