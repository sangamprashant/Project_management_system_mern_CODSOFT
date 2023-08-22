import React from "react";

function Service() {
  return (
    <div className="service">
      <div className="row">
        <div className="service_item">
          <div className="card ">
            <h5 role="img" aria-label="Task">📋</h5>
            <p className="title dashboard_item_label"><b>Task Management</b></p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 role="img" aria-label="Workflow">🔄</h5>
            <p className="title dashboard_item_label"><b>Workflow Automation</b></p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 role="img" aria-label="Communication">📢</h5>
            <p className="title dashboard_item_label"><b>Communication</b></p>
          </div>
        </div>
        <div className="service_item">
          <div className="card ">
            <h5 role="img" aria-label="Efficiency">⏱️</h5>
            <p className="title dashboard_item_label"><b>Efficiency</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
