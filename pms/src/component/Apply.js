import React from 'react'

function Apply() {
  return (
    <div className="log">
    <div className="card col-md-6">
    <h5>Apply For Job</h5>
      <div>
      <div>
        <label className="log_label">Name</label>
        <input className="logfield" placeholder="Enter email" />
      </div>
        <label className="log_label">Email</label>
        <input className="logfield" placeholder="Enter email" />
      </div>
      <div>
        <label className="log_label">Mobile</label>
        <input className="logfield" placeholder="Enter email" />
      </div>
      <div>
        <input className="log_label logfield button_log" type="button" value="submit"/>
      </div>
    </div>
  </div>
  )
}

export default Apply
