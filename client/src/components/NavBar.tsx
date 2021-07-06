import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export const NavBar: React.FC = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault(); // prevent a default behaviour
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1 navbar-links">
        <span className="brand-logo">Links Dictionary</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
