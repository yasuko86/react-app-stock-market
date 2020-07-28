import React from 'react';
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <div className="box-layout__items">
          <h1 className="box-layout__title">Stock Prices</h1>
          <h2>Welcome to our page.</h2>
          <p>Be up-to-date about the 500 hottest companies.</p>
          <Link className="button" to="/stocks">Search Stocks</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;