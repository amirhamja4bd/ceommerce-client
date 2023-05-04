import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import React, { Fragment } from 'react';
import '../assets/css/progress.css';

const Loading = ({ path = "login" })=> {

  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count]);

  return (
    <Fragment>
        <div className="LoadingOverlay">
            <div className="Line-Progress">
                <div className="indeterminate"></div>
            </div>
        </div>
    </Fragment>
  );
}

export default Loading;
