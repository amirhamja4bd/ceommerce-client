import React, { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../assets/css/style.css'
import axios from 'axios';

const TopNav = () => {

    const navigate = useNavigate();
    
    const[carts, setCarts] = useState([]);
    const[wishList, setWishList] = useState([]);

    const wishLength = wishList?.length;
    const cartLength = carts?.items?.length;

    useEffect(() => {
        loadCarts();
        loadWishList();
    }, []);

    const loadCarts = async () => {
        try {
          const token = localStorage.getItem('token'); // get the token from local storage
          const { data } = await axios.get("/carts", { headers: { Authorization: token } });
          setCarts(data);
        } catch (err) {
          console.log(err);
        }
    };
    const loadWishList = async () => {
        try {
          const token = localStorage.getItem('token'); // get the token from local storage
          const { data } = await axios.get("/wishlists", { headers: { Authorization: token } });
          setWishList(data.wishlist);
        } catch (err) {
          console.log(err);
        }
    };
    

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
                                style={{
                                    background: '#2DB77A',
                                    color: "#fff",
                                    borderColor:"#2DB77A"
                                  }}
                                className='fs-6 pt-1'
                                count={wishLength}
                                offset={[-10, 5]}
                                size="small"
                                showZero={true}
                            >
                            <NavLink className='me-2' to="/wish"> <i class="fa-regular fa-heart  fs-5"></i></NavLink>
                            </Badge>
                        </li>
                        <li>
                            <Badge 
                                style={{
                                  background: '#2DB77A',
                                  color: "#fff",
                                  borderColor:"#2DB77A"
                                }}
                                className='fs-6 pt-1'
                                count={cartLength}
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