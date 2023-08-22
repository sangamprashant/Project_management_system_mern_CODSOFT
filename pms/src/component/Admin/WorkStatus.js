import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function WorkStatus() {
  const [workByStatus, setWorkStatus] = useState({
    pending: [],
    confirmed: [],
    working: [],
    done: [],
    canceled: [],
  });
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Pending");
  const [showData, setShowData] = useState([]);
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
      const response = await axios.get(
        "/api/get/all/works"
      );
      setWorkStatus(response.data.workByStatus);
      setShowData(response.data.workByStatus.pending);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handelPending = () => {
    setTitle("Pending");
    setShowData(workByStatus.pending);
  };
  const handelConfirmed = () => {
    setTitle("Confirmed");
    setShowData(workByStatus.confirmed);
  };
  const handelWorking = () => {
    setTitle("Working");
    setShowData(workByStatus.working);
  };
  const handelDone = () => {
    setTitle("Done");
    setShowData(workByStatus.done);
  };
  const handelCanceled = () => {
    setTitle("Canceled");
    setShowData(workByStatus.canceled);
  };
  // Function to cancel a work order
  const cancelWorkOrder = async (workOrderId) => {
    try {
      const response = await axios.put(
        `/api/update/status/${workOrderId}`,{newStatus: "canceled",});
      if(response.data.message){
        toast.success(response.data.message)
        fetchUsers();
      }
    } catch (error) {
      console.error("Error canceling work order:", error);
    }
  };

  return (
    <div>
      {loading?<Loading value="Work Status"/>:
      <div className="Status">
        <div className="status_option_container">
          <h5>Work Status</h5>
          <div className="row">
            <div className="status_option">
              <div className="card" onClick={handelPending}>
                <h5>🕰️ {workByStatus.pending.length}</h5>
                <h5>Pending</h5>
              </div>
            </div>
            <div className="status_option">
              <div className="card" onClick={handelConfirmed}>
                <h5>✔️ {workByStatus.confirmed.length}</h5>
                <h5>Confirmed</h5>
              </div>
            </div>
            <div className="status_option">
              <div className="card" onClick={handelWorking}>
                <h5>⏳ {workByStatus.working.length}</h5>
                <h5>Working</h5>
              </div>
            </div>
            <div className="status_option">
              <div className="card" onClick={handelDone}>
                <h5>👍 {workByStatus.done.length}</h5>
                <h5>Done</h5>
              </div>
            </div>
            <div className="status_option">
              <div className="card" onClick={handelCanceled}>
                <h5>❌ {workByStatus.canceled.length}</h5>
                <h5>Canceled</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="card m-3 p-3">
          <h4>{title}</h4>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Status</th>
                {title!=="Canceled"&&title!=="Done"?<th>Action</th>:""}
              </tr>
            </thead>
            <tbody>
              {showData.map((data) => (
                <tr key={data._id}>
                  <td>{data.workTitle}</td>
                  <td>{data.assignedTo?.name}</td>
                  <td>{data.status}</td>
                  {title!=="Canceled"&&title!=="Done"?<td className="cancel_text" onClick={() => cancelWorkOrder(data._id)}>Cancele</td>:""}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
}

export default WorkStatus;
