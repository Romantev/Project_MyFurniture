import "./Nav.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <NavLink to="/userprofil" className="nav-link">
          <div className="nav-site">
            <h5>User Profil</h5>
          </div>
        </NavLink>
        <NavLink to="/usersignup" className="nav-link">
          <div className="nav-site">
            <h5>Sign Up</h5>
          </div>
        </NavLink>
        <NavLink to="/" className="nav-link">
          <div className="nav-site">
            <h5>HOME</h5>
          </div>
        </NavLink>
        <NavLink to="/bigstuff" className="nav-link">
          <div className="nav-site">
            <h5>BIG STUFF</h5>
          </div>
        </NavLink>
        <NavLink to="/notsobigstuff" className="nav-link">
          <div className="nav-site">
            <h5>NOT SO BIG STUFF</h5>
          </div>
        </NavLink>
        <NavLink to="/smallstuff" className="nav-link">
          <div className="nav-site">
            <h5>SMALL STUFF</h5>
          </div>
        </NavLink>
      </nav>
    </>
  );
};

export default Nav;
