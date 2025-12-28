import { NavLink } from "react-router";
import { useState } from "react";
import logo from "../assets/images/logochou.png";

import "./Header.css";

function Header () {
  const [open, setOpen] = useState(false);
  
  console.log("Submenu open state:", open); // Debug
  
  return (
    <header className="header-container">
      <NavLink to="/">
        <img src={logo} className="logoChou" alt="Logo" />
      </NavLink>
      <nav className="header-navbar">
        <ul>
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
          <li>
            <NavLink to="/Coach">Vision du coach</NavLink>
          </li>
          <li>
            <NavLink to="/News">Actualités</NavLink>
          </li>
          <li 
            className="has-sub"
            onMouseEnter={() => {
              console.log("Mouse enter - opening submenu");
              setOpen(true);
            }}
            onMouseLeave={() => {
              console.log("Mouse leave - closing submenu");
              setOpen(false);
            }}
          >
            <NavLink to="/Training"> 
              Training Room
            </NavLink>
            {open && (
              <ul className="submenu open">
                <li>
                  <NavLink to="/MainsList">Focus Main</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/Faq">FAQ</NavLink>
          </li>
        </ul>
      </nav>
    </header> 
  );
}

export default Header;