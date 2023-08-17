import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewApplications() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch Users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get/applications");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/applications/${id}`);
      // Refresh the applications list after successful deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div>
      <div className="log">
        <div className="card">
          <h2>Applications List</h2>
          <hr/>
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
                      <i className="mx-2 fa fa-trash-can" onClick={() => handleDelete(user._id)}></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewApplications;
