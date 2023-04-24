import "./NavBar.css"

import React from 'react';
import {BsDatabaseFillLock} from "react-icons/bs"
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="https://cdn-icons-png.flaticon.com/512/3190/3190472.png" alt="logo"/>
        <h1 className='logoname'>HushPass</h1>
      </div>
      <div className="navbar-menu">
        <span className="navbar-menu-item about">About</span>
        <span className="navbar-menu-item login">Login</span>
      </div>
    </div>
  );
}

export default Navbar;
