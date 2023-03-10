import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Affix, Button } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from 'antd';
import TopNav from './TopNav';


const image ="https://raw.githubusercontent.com/amirhamja4bd/portfolio/main/images/ZayanShop.png"
const image1 ="../../assets/img/ZayanShop.png"
const image2 ="https://images.rawpixel.com/image_400/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg"

const MasterLayout = () => {
    const [auth, setAuth ] = useAuth();
    const [top, setTop] = useState(0);
     const navigate = useNavigate();

    const logout = () => {
        setAuth({ ...auth, user: null, token: "" })
        localStorage.removeItem("auth")
        navigate("/login")
    }

    return (
        <div>
            <TopNav/>
            <div className="masterLayout">
                <Affix offsetTop={top} zIndex={2000}>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className=' shadow navbar'  >
                    <Container className='sticky-top'>
                        <Navbar.Brand href="/"><img src={image} style={{ height:"45px"}} alt="g" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        
                        <Nav className=' ms-auto t-head'>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">
                                HOME
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/shop">
                                SHOP
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/cart">
                                CART
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/categories">
                                CATEGORIES
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/checkout">
                                CHECKOUT
                            </NavLink>
                            </li>
                            
                            <form className="navbar-form" role="search">
                                <div className="input-group add-on">
                                <input className="form-control bg-light" placeholder="Searching for...." name="srch-term" id="srch-term" type="text"/>
                                <div className="input-group-btn">
                                    <button className="btn btn-light border border-gray " style={{borderRadius:" 0px 10px 10px 0px", border:"1px"}} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                                </div>
                            </form>
                            {!auth?.user ? (
                            <>
                                <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/login">
                                    Login
                                </NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink className="nav-link " aria-current="page" to="/register">
                                    Register
                                </NavLink>
                                </li>
                            </>
                            ) :(
                            <div class="dropdown-center ms-2">
                                <button class="main-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   <img className='profile-img' src={auth?.user?.photo || image2} alt=""/> {auth?.user?.fullName}
                                </button>
                                <ul class="dropdown-menu">
                                    <li className="nav-item">
                                    <NavLink className="nav-link " aria-current="page" to={`/dashboard/${auth?.user?.role === 1 ? "admin/profile" : "user/profile"
                            }`}>
                                        <i className=" me-2 fa-solid fa-border-none"></i>  DASHBOARD
                                    </NavLink>
                                    </li>
                                    <li><hr class="dropdown-divider"/></li>
                                    <li className="nav-item">
                                    <NavLink onClick={logout} to="/login" className="nav-link " aria-current="page">
                                        <i className=" me-2 fa-solid fa-right-from-bracket"></i>  LOGOUT
                                    </NavLink>
                                    </li>
                                </ul>
                            </div>
                            )}
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                </Affix>
            </div>
        </div>
    );
};

export default MasterLayout;