import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import user from "../image/user.png";
import Loading from "../Loading";

function ViewEmployeeProfile() {

  const [selectedUserData, setSelectedUserData] = useState(null); // Store user details
  const [workCounts, setWorkCounts] = useState({
    Pending: 0,
    Done: 0,
    Canceled: 0,
  });
  const { empId } = useParams();
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch Users when the component mounts
    getUserDetails(empId);
    getUserDasgboard(empId);
  }, [empId]);

  const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `/api/get/user/${userId}`
      );
      setSelectedUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Error fetching user details");
    }
  };

  const getUserDasgboard = async (userId) => {
    // Fetch worjkorder count when the component mounts
    axios
      .get(`/api/user/work/count/${userId}`)
      .then((response) => {
        setWorkCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });
  };

  return (
    <div className="log admin_dashboard">
      {!selectedUserData && workCounts? (
        <div>
          <Loading value="Employee Profile"/>
        </div>
      ) : (
        <div>
          <div className="card p-2 col-md-12">
            <h5>Employee Details</h5>
            <div className="row aling_center">
              <div className="colmd4">
                <img
                  className="user_image"
                  src={selectedUserData.image ? selectedUserData.image : user}
                  alt="User Profile"
                />
              </div>
              <div className="colmd8">
                <div>
                  <label className="log_label">Worker Name</label>
                  <input
                    className="logfield"
                    value={selectedUserData.name}
                    disabled
                  />
                </div>
                <div>
                  <label className="log_label">Worker Email</label>
                  <input
                    className="logfield"
                    value={selectedUserData.email}
                    disabled
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="">
              <h5>Employee Dashboard</h5>
              <div className="row">
                <div className="user_item">
                  <div className="card ">
                    <h5 className="dashboard_item_count">
                      {workCounts.Pending}
                    </h5>
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
                    <h5 className="dashboard_item_count">
                      {workCounts.Canceled}
                    </h5>
                    <p className="dashboard_item_label">No.of Canceled Work</p>
                  </div>
                </div>
              </div>
            </div>
            {storedUserData&&storedUserData.type==="admin"&&<div>
              <input
                className="log_label logfield button_log  container_to_hide"
                type="button"
                value="Print"
                onClick={() => window.print()}
              />
            </div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewEmployeeProfile;
