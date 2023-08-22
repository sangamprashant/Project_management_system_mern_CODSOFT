import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer container_to_hide">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="footer_heading">💼 Project Management System</h5>
            <p className="footer-description">
              Efficiently manage tasks and assignments within your organization.
            </p>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h5 className="footer-heading">Useful Links</h5>
                <ul className="footer-links">
                  <p>
                    <Link to="/apply">👉 Apply</Link>
                  </p>
                  <p>
                    <Link to="/signin">👉 Sign In</Link>
                  </p>
                </ul>
              </div>
              <div className="col-md-6">
                <h5 className="footer-heading">Contact Us</h5>
                <ul className="footer-links">
                  <p>
                    <Link to="/contact">👉 Contact Us</Link>
                  </p>
                  <p>
                    <Link to="/privacy">👉 Privacy Policy</Link>
                  </p>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
