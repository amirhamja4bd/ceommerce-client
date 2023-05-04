import React from "react";
import { Outlet } from "react-router-dom";
import UserLayout from "../components/nav/UserLayout";

const Layout = () => {
  return (
    <>
      <UserLayout>
        <Outlet />
            {/* <div class="copyright-text text-lg-start text-center mb-3 mb-lg-0 mt-5 sticky-bottom">
                <div className="bg-light text-light text-center p-3">
                    <p class="mb-0 text-center">Copyright © 2023 <a href="#">Amir_hamza</a>. All Rights Reserved.</p>
                </div>
            </div> */}
      </UserLayout>
    </>
  );
};

export default Layout;