import React from 'react';
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="content-container">
      <div className="message">
        <div className="message__box">
          <div className="message__image">
            <img src="/images/alert-309217_640.png" alt="error"/> 
          </div>
          <div className="message__text">
              <h1>Oops!</h1>
              <h2>404 ERROR - The page can't be found.</h2>
              <Link className="button" to="/">Go Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;