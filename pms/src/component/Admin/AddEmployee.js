import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import user from "../image/user.png"

function AddEmployee() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [printContainer, setPrintContainer] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  const handleLogin = async () => {
    if (!name) {
      toast.error("Name is required.");
      return;
    }
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    try {
        const response = await axios.post("http://localhost:5000/api/admin/create/user",{email: email,name: name,});

      if (response.data.message) {
        toast.success(response.data.message);
        setPrintContainer(true);
        setUserDetails(response.data.user);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error);
      // Handle login failure
    }
  };

  return (
    <div className="log">
      {!printContainer ? (
        <div className="card col-md-6">
          <h5>Add Employee</h5>
          <div>
            <label className="log_label">Employee Name</label>
            <input
              className="logfield"
              placeholder="Enter name"
              type="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div>
            <label className="log_label">Employee Email</label>
            <input
              className="logfield"
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="log_label">Employee Password</label>
            <input className="logfield" value="1234" disabled />
          </div>

          <div>
            <input
              className="log_label logfield button_log"
              type="button"
              value="Submit"
              onClick={handleLogin}
            />
          </div>
        </div>
      ) : (
        <div className="card col-md-6">
          <h5>Print Employee Details</h5>
          <div className="row aling_center">
            <div className="colmd4">
                <img className="user_image" src={user}/>
            </div>
            <div className="colmd8">
              <div>
                <label className="log_label">Employee Name</label>
                <input className="logfield" value={userDetails.name} disabled />
              </div>
              <div>
                <label className="log_label">Employee Email</label>
                <input
                  className="logfield"
                  value={userDetails.email}
                  disabled
                />
              </div>
              <div>
                <label className="log_label">Employee Password</label>
                <input
                  className="logfield"
                  value={userDetails.password}
                  disabled
                />
              </div>
            </div>
          </div>

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

export default AddEmployee;
