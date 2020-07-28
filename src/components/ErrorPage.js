import React from 'react';
import history from "../utils/history";

function ErrorPage({ location }) {

  if(!location.error) {
    history.push("/")
  }

  return (
    <div className="content-container">
      <div className="message">
        <div className="message__box">
          <div className="message__image">
            <img src="/images/alert-309217_640.png" alt="error"/> 
          </div>
          <div className="message__text">
            <h1>Sorry!</h1>
            <h2>We couldn't access the server.</h2>
            <p>Please check your internet connection and try again.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;