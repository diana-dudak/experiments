import React from "react";
import { NavLink as Link } from "react-router-dom";
import "./index.scss";
import { pages } from "./pages";

const Nav = () => {
  return (
    <nav className="Nav">
      <Link to={"/"} className="Nav__home">
        Home
      </Link>
      <ul>
        {pages.map((page) => (
          <li key={page.path}>
            <Link
              to={page.path}
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
