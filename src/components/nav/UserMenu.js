import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
    return (
        <div className=' shadow bg-light user-menu pt-4' style={{height:"100%"}}>
            <ul className="list-group list-unstyled">
                <li className='dashboard'>
                    <NavLink className="list-group-item bg-light " to="/dashboard/user/profile" style={{border:"none" , borderLeft:"8px"}}>
                    Profile
                    </NavLink>
                </li>

                <li>
                    <NavLink className="list-group-item bg-light " to="/dashboard/user/orders" style={{border:"none" , borderLeft:"8px"}}>
                    Orders
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default UserMenu;