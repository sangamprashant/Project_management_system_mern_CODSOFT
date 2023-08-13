import React, { useState } from 'react';
import axios from 'axios';

function Apply() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name,
        email,
        mobile
      };

      const response = await axios.post('http://localhost:5000/api/submit/application', formData);
      console.log(response.data);

      // Clear the form fields after successful submission
      setName('');
      setEmail('');
      setMobile('');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="log">
      <div className="card col-md-6">
        <h5>Apply For Job</h5>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="log_label">Name</label>
            <input
              className="logfield"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="log_label">Email</label>
            <input
              className="logfield"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="log_label">Mobile</label>
            <input
              className="logfield"
              placeholder="Enter mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <input className="log_label logfield button_log" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Apply;
