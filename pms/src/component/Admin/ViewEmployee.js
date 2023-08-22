import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ViewEmployee() {
  const [Users, setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate()

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
      setLoading(false)
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/delete/user/${id}`);
      // Refresh the applications list after successful deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div>
      {loading? <Loading value="Employees"/> :<div className="log">
        <div className="card">
          <h2>Employee List</h2>
          <hr/>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="action_items">
                      <i className="mx-2 fa fa-trash-can" onClick={() => handleDelete(user._id)}></i>
                      <i className="mx-2 fa fa-eye" onClick={() =>{navigate(`/employee/profile/${user._id}`)}}></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
}

export default ViewEmployee;
