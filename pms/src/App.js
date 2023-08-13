import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apply from "./component/Apply";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Sidenav from "./component/Sidenav";
import Signin from "./component/Signin";

function App() {
  return (
    <BrowserRouter>
      <div className="row">
        <Sidenav />
        <div className="topNav">
          <div className="nav">
            <h5 className="title">Project Management System</h5>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/apply" element={<Apply />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
