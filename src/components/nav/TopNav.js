import React from 'react';
import { Badge } from 'antd';
import { NavLink } from 'react-router-dom';
import '../../assets/css/style.css'
const TopNav = () => {
    return (
        <div>
            <div id="top-header bg-light">
				<div className="px-5 d-flex justify-content-between top-header">
					<ul className="header-links pull-left">
						<li><a href="#"><i className="fa fa-phone"></i> +8801756386529</a></li>
						<li><a href="#"><i className="fa-regular fa-envelope"></i> amirhamja4bd@gmail.com</a></li>
						<li><a href="#"><i className="fa-solid fa-location-dot"></i> Kochukhet, Dhaka</a></li>
					</ul>
					<ul className="header-links pull-right text-light">
                        <li>
                            <Badge 
                                className='fs-6 pt-1'
                                count="2"
                                offset={[-10, 5]}
                                size="small"
                                showZero={true}
                            >
                            <NavLink className='me-2' to="/wish"> <i class="fa-regular fa-heart  fs-5"></i></NavLink>
                            </Badge>
                        </li>
                        <li>
                            <Badge 
                                className='fs-6 pt-1'
                                count="2"
                                offset={[-24, 5]}
                                size="small"
                                showZero={true}
                            >
                            <NavLink className='me-4' to="/cart"> <i class="fa-solid fa-cart-shopping fs-5"></i></NavLink>
                            </Badge>
                        </li>
					</ul>
				</div>
			</div>
        </div>
    );
};

export default TopNav;