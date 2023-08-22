import axios from "axios";
import React, { useEffect, useState } from "react";
import defaltImg from "../image/user.png"
import { Link, useNavigate } from "react-router-dom";

function EmployeeToDisplay() {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();

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
  return (
    <div>
      <h5>Our Employees</h5>
      <div className="row">
        {Users.map((user) => (
          <div className="col-md-3 my-1" key={user._id}>
            <Link className="card" to={`/employee/profile/${user._id}`}>
              <img className="user_image" src={user.image?user.image:defaltImg} alt="employrr image" />
              <h3>{user.name}</h3>
              <h3>{user.email}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeToDisplay;
