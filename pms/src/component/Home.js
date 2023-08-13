import React from "react";
import Hero from "./SubHome/Hero";
import Service from "./SubHome/Service";
import About from "./SubHome/About";
import Apply from "./Apply";

function Home() {
  return (
    <div>
      <Hero />
      <Service />
      <About />
      <Apply />
    </div>
  );
}

export default Home;
