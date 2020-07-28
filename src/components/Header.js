import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__logo" to="/stocks"><h1>Stock Prices</h1></Link>
          <Link className="button button--link" to="/">Home</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
