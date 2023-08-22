import React from "react";
import Hero from "./SubHome/Hero";
import Service from "./SubHome/Service";
import About from "./SubHome/About";
import Apply from "./Apply";
import EmployeeToDisplay from "./SubHome/EmployeeToDisplay";

function Home() {
  return (
    <div>
      <Hero />
      <Service />
      <About />
      <Apply />
      <EmployeeToDisplay/>
    </div>
  );
}

export default Home;
