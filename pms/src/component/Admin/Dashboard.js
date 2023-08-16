import React from "react";

function Dashboard() {
  return (
    <div className="admin_dashboard">
      <div className="row">
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">43</h5>
            <p className="dashboard_item_label">No.of Employee</p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">43</h5>
            <p className="dashboard_item_label">No.of Application</p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">43</h5>
            <p className="dashboard_item_label">No.of Pending Work</p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 className="dashboard_item_count">43</h5>
            <p className="dashboard_item_label">No.of Completed Work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
