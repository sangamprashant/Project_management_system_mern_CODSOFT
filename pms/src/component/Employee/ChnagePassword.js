import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for making HTTP requests
import { toast } from "react-toastify";

function ChnagePassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
  }, [navigate]);

  const handleChangePassword = async () => {
    try {
      // Make a POST request to change the password
      const response = await axios.post(
        `/api/change/password/${userId}`,
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Password change failed:", error);
    }
  };

  return (
    <div className="log">
      <div className="card col-md-6">
        <h5>Change Password</h5>
        <div>
          <label className="log_label">Old Password</label>
          <input
            className="logfield"
            placeholder="Enter old password"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="log_label">New Password</label>
          <input
            className="logfield"
            placeholder="Enter new password"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="log_label logfield button_log"
            type="button"
            value="Submit"
            onClick={handleChangePassword} // Call the password change function on button click
          />
        </div>
      </div>
    </div>
  );
}

export default ChnagePassword;
