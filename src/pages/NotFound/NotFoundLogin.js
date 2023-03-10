import React from 'react';
import './notFound.css'
const NotFoundLogin = () => {
    return (
        <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
            <h2>Page not found for you</h2>
          </div>
          <a className='login-a' href="/login">Please Login</a>
        </div>
      </div>
    );
};
export default NotFoundLogin;