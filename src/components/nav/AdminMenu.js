import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className=' shadow admin-menu bg-light admin-menu pt-4' style={{height:"100%"}}>
            <ul className="list-group list-unstyled">
                <li className='dashboard'>
                    <NavLink className="list-group-item bg-light " to="/dashboard/admin/profile" style={{border:"none"}}>
                    Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item bg-light " to="/dashboard/admin/category" style={{border:"none"}}>
                    Create Category
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item bg-light " to="/dashboard/admin/brand" style={{border:"none"}}>
                    Create Brand
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item bg-light " to="/dashboard/admin/product" style={{border:"none"}}>
                    Create Product
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item bg-light " to="/dashboard/admin/products" style={{border:"none"}}>
                    In House Product
                    </NavLink>
                </li>
                <li>
                    <NavLink className="list-group-item bg-light " to="/dashboard/admin/orders" style={{border:"none"}}>
                    Orders Manage
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;