import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    <div className=""></div>
    // <div
    //   className="d-flex justify-content-center align-items-center"
    //   style={{ height: "100vh" }}
    // >
    //   <div class="text-center">
    //     <div class="spinner-border text-primary p-3" role="status">
    //         <span class="visually-hidden">Loading...</span>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Loading;
