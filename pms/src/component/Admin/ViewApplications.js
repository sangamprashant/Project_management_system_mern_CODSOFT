import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

function ViewApplications() {
  const [Users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve user data from local storage when the component mounts
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if(!storedUserData||storedUserData.type!=="admin"){
      navigate("/signin")
    }
  }, []);

  useEffect(() => {
    // Fetch Users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/get/applications"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/applications/${id}`);
      // Refresh the applications list after successful deletion
      toast.success("Application deleted successfully.");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("failed to delete.");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading value="Applications" />
      ) : (
        <div className="log">
          <div className="card">
            <h2>Applications List</h2>
            <hr />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {Users.map((user) => (
                  <tr key={user._id}>
                    <td className="content_cell">{user.name}</td>
                    <td className="content_cell">{user.email}</td>
                    <td className="content_cell">{user.mobile}</td>
                    <td>
                      <div className="action_items">
                        <i
                          className="mx-2 fa fa-trash-can"
                          onClick={() => handleDelete(user._id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewApplications;
