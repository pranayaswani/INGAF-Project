import react from "react";
import logo from '../images/logo.png';
import {NavLink} from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img className="logo" src={logo} alt="" /></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/AboutUs">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ContactUs">
                  Contact Us
                </a>
              </li>
              <li className="nav-item"><a className="nav-link" href="/Login">Login</a></li>
              <li className="nav-item"><a className="nav-link" href="/Masters">Masters</a>
                <ul className="navbar-nav ml-auto sub-menu">
                  <li className="nav-item"><a className="nav-link" href="/TrainingCentre">Training Centres</a></li>              
                  <li className="nav-item"><a className="nav-link" href="/TrainingTypes">Training Types</a></li>                                
                  <li className="nav-item"><a className="nav-link" href="/TrainingSubTypes">Training Sub-Types</a></li>                                                  
                  <li className="nav-item"><a className="nav-link" href="/Designations">Designations</a></li>                                                                    
                </ul>                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
