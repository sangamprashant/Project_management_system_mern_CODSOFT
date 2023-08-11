import React from "react";

function Signin() {
  return (
    <div className="log">
      <div className="card col-md-6">
      <h5>SignIn</h5>
        <div>
          <label className="log_label">Email</label>
          <input className="logfield" placeholder="Enter email" />
        </div>
        <div>
          <label className="log_label">Email</label>
          <input className="logfield" placeholder="Enter email" />
        </div>
        <div>
          <input className="log_label logfield button_log" type="button" value="submit"/>
        </div>
        <div>
          <label className="log_label">Forgot Password?</label>
        </div>
        <div>
          <label className="log_label">New User Register Here. </label>
        </div>
      </div>
    </div>
  );
}

export default Signin;
