import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UpdateName() {
  const navigate = useNavigate();
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Retrieve user data from local storage when the component mounts
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (!storedUserData || storedUserData.type !== "employee") {
      toast.error("Bad request.")
      navigate("/signin");
    } else {
      // Set the user ID from the stored user data
      setUserId(storedUserData._id);
    }
  }, []);

  useEffect(() => {
    handelGetName();
  }, [userId]);

  const handelGetName = () => {
    axios
      .get(`/api/get/user/${userId}`)
      .then((response) => {
        setOldName(response.data.user.name);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });
  };

  const handleUpdateName = async () => {
    try {
      // Make a PUT request to update the name
      const response = await axios.put(`/api/update/name/${userId}`,{newName: newName,});
      if (response.data.message) {
        toast.success(response.data.message);
        handelGetName();
        setNewName("");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Name update failed:", error.response.data.error);
    }
  };
  return (
    <div className="log">
      <div className="card col-md-6">
        <h5>Update Name</h5>
        <div>
          <label className="log_label">Old Name</label>
          <input className="logfield" value={oldName} disabled />
        </div>
        <div>
          <label className="log_label">New Name</label>
          <input
            className="logfield"
            placeholder="Enter new name"
            type="text"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="log_label logfield button_log"
            type="button"
            value="Update Name"
            onClick={handleUpdateName}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateName;
