import "./App.css";
import Apply from "./component/Apply";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Sidenav from "./component/Sidenav";
import Signin from "./component/Signin";

function App() {
  return (
    <div className="row">
      <Sidenav />
      <div className="topNav">
        <div className="nav">
          <h5 className="title">Project Management System</h5>
        </div>
        <Home/>
        <Signin/>
        <Apply/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
