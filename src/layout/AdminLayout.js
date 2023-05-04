import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/nav/AdminNavbar";

const Layout = () => {
  return (
    <>
      <AdminNavbar>
        <Outlet />
            {/* <div class="copyright-text text-lg-start text-center mb-3 mb-lg-0 mt-5 sticky-bottom">
                <div className="bg-light text-light text-center p-3">
                    <p class="mb-0 text-center">Copyright © 2023 <a href="#">Amir_hamza</a>. All Rights Reserved.</p>
                </div>
            </div> */}
      </AdminNavbar>
    </>
  );
};

export default Layout;