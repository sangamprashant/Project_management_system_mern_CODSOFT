import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import user from "../image/user.png";

function AssignWork() {
  const navigate = useNavigate();
  const [workname, setWorkname] = useState("");
  const [workDetails, setWorkDetails] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserData, setSelectedUserData] = useState(null); // Store user details
  const [print, setPrint] = useState(true);

  useEffect(() => {
    // Retrieve user data from local storage when the component mounts
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if(!storedUserData||storedUserData.type!=="admin"){
      toast.error("Bad request.")
      navigate("/signin")
    }
  }, []);

  useEffect(() => {
    // Fetch Users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/get/user");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

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

  const handleAssignWork = async () => {
    try {
      if (!workname) {
        toast.error("Please enter work title.");
        return;
      }
      if (!workDetails) {
        toast.error("Please enter work details.");
        return;
      }
      if (!selectedUser) {
        toast.error("Please select an employee");
        return;
      }

      // Fetch user details for the selected user
      await getUserDetails(selectedUser);

      // Assuming you want to log the user details
      if (selectedUserData) {
        const response = await axios.post(
          "/api/assign/work",
          {
            assignedTo: selectedUser,
            workTitle: workname,
            workDetails: workDetails,
          }
        );

        if (response.data.message) {
          toast.success(response.data.message);
          setPrint(false);
        } else {
          toast.error(response.data.error);
        }

        // navigate("/some-other-page");
      } else {
        console.error("No user details found for the selected user");
        toast.error("No user details found for the selected user");
      }
    } catch (error) {
      console.error("Error assigning work:", error);
      toast.error("Error assigning work");
    }
  };

  return (
    <div className="log">
      {print ? (
        <div className="card col-md-6">
          <h5>Assign Work</h5>
          <div>
            <label className="log_label">Work Title</label>
            <input
              className="logfield"
              placeholder="Enter workname"
              type="text"
              value={workname}
              onChange={(e) => setWorkname(e.target.value)}
            />
          </div>
          <div>
            <label className="log_label">Work Description</label>
            <input
              className="logfield"
              placeholder="Enter workname"
              type="text"
              value={workDetails}
              onChange={(e) => setWorkDetails(e.target.value)}
            />
          </div>
          <div>
            <label className="log_label">Select Employee</label>
            <select
              className="logfield"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select an Employee</option>
              {users.map((user) => (
                <option key={user.id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              className="log_label logfield button_log"
              type="button"
              value="Submit"
              onClick={handleAssignWork}
            />
          </div>
        </div>
      ) : (
        <div className="card col-md-6">
          <h5>Worker Details</h5>
          <div className="row aling_center">
            <div className="colmd4">
              <img className="user_image" src={selectedUserData.image?selectedUserData.image:user} />
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
          <hr/>
          <h5>Work Details</h5>
          <h3>Work Title:</h3>
          <h4>{workname}</h4>
          <h3>Work Details:</h3>
          <p>{workDetails}</p>
          <h3>Work Status:</h3>
          <p>Pending</p>
          <h3 className="right-align-text">Admin Stamp</h3>
          <div>
            <input
              className="log_label logfield button_log  container_to_hide"
              type="button"
              value="Print"
              onClick={() => window.print()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignWork;
