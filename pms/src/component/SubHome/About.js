import React from "react";
import image from "../image/PMS2.png"

function About() {
  return (
    <div className="about-us">
      <h5>
        About<span className="heading_span"> Us</span>
      </h5>
      <div className="row">
        <div className="col-md-6">
          <div>
            <img
              className="about_image"
              src={image}
              alt="about pic"
            />
          </div>
        </div>
        <div className="col-md-6">
          <p>
            Welcome to our Project Management System! We are a dedicated team
            working to provide efficient task management solutions for your
            organization.
          </p>
          <p>
            Our mission is to streamline your workflow, simplify task
            allocation, and enhance communication between employees and
            administrators.
          </p>
          <p>
            With our user-friendly platform, employees can easily request and
            track assignments, while administrators can manage applications and
            oversee the system effortlessly.
          </p>
          <p>
            Thank you for choosing our system to help manage your projects and
            tasks. We look forward to serving your organization's needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
