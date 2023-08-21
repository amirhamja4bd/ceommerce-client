import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Affix, Button } from 'antd';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from 'antd';
import TopNav from './TopNav';
import axios from 'axios';
import { useSearch } from '../../context/SearchContext';
import '../../assets/css/style.css'
import { Buffer } from 'buffer';
import { useGlobalContext } from '../../context/GlobalContext';
import { BsBoxArrowLeft } from 'react-icons/bs';

const image ="https://raw.githubusercontent.com/amirhamja4bd/portfolio-html/main/images/ZayanShop.png"
const image1 ="../../assets/img/ZayanShop.png"
const image2 ="https://images.rawpixel.com/image_400/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zMjgtMzY2LXRvbmctMDhfMS5qcGc.jpg"

const MasterLayout = () => {
    const [auth, setAuth , token, setToken] = useAuth();
    const [top, setTop] = useState(0);
    const [search, setSearch] = useSearch();
    const { countCart } = useGlobalContext();
     const navigate = useNavigate();
    //  console.log("cartsMaster",carts);
    useEffect(() => {
        // loadCarts()
    }, []);

    const logout = () => {
        setAuth({ ...auth, user: null, token: "" })
        setToken({ token: "" })
        localStorage.removeItem("auth")
        localStorage.removeItem("token")
        navigate("/login")
    }


    const handleSearch = async (e) =>{
        e.preventDefault();
        try{
            const { data } = await axios.get(`/products/search/${search?.keyword}`);
            setSearch({ ...search, results: data , keyword: '' });
            navigate('/search')
        }
        catch(err){
            console.log(err);
        }
    };

    const photoData = auth?.user?.photo?.data || '';

    return (
        <div>
            <TopNav/>
            <div className="masterLayout">
                <Affix offsetTop={top} zIndex={2000}>
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='  navbar'  >
                    <Container className='sticky-top'>
                        <Navbar.Brand href="/"><img src={image} style={{ height:"45px"}} alt="g" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        
                        <Nav className=' ms-auto t-head d-flex align-items-center'>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">
                                HOME
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/shopping">
                                SHOPPING
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/categories">
                                CATEGORIES
                            </NavLink>
                            </li>
                            {/* <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/checkout">
                                CHECKOUT
                            </NavLink>
                            </li> */}
                            <li className="nav-item me-2 " style={{marginTop: "-4px"}}>
                            <Badge 
                                style={{
                                    background: '#2DB77A',
                                  }}
                                className='fs-6 pt-1'
                                count={countCart}
                                offset={[-3, 15]}
                                size="small"
                                showZero={true}
                            >
                            <NavLink className="nav-link" aria-current="page" to="/cart">
                                CART
                            </NavLink>
                            </Badge>
                            </li>
                            
                            <form onSubmit={handleSearch} className="navbar-form" role="search">
                                <div className="input-group add-on">
                                <input
                                    className="form-control bg-light"
                                    style={{ borderRadius: "30px 0 0 30px" }}
                                    placeholder="Searching for...."
                                    name="srch-term"
                                    id="srch-term"
                                    type="search"
                                    onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                                    value={search.keyword}
                                    />
                                <div className="input-group-btn">
                                    <button 
                                        className="btn btn-light border border-gray " 
                                        style={{borderRadius:" 0px 30px 30px 0px", border:"1px"}}
                                        type="submit">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                    </button>
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
                                <div className="float-right h-auto d-flex ">
                                    <div className="user-dropdown ">
                                        <div className="d-flex my-bg-primary px-1 pt-1" style={{borderRadius:"40px"}}>
                                            <p className="align-middle pe-2 text-light pt-2 text-dark" >
                                            <img
                                                className="profile-img me-2 border"
                                                src={`data:${auth?.user?.photo?.contentType};base64,${Buffer.from(photoData).toString("base64")}`}
                                                alt=""
                                                style={{ width: "30px", height: "30px" }}
                                            />
                                            {auth?.user?.fullName}</p>
                                        </div>
                                        <div className="user-dropdown-content shadow ">
                                            <div className="mt-4 text-center">
                                            <img
                                                className="profile-img"
                                                src={`data:${auth?.user?.photo?.contentType};base64,${Buffer.from(photoData).toString("base64")}`}
                                                alt=""
                                                style={{ width: "30px", height: "30px" }}
                                            />
                                                {/* <img className='profile-img' src={auth?.user?.photo} alt="" style={{width:"30px", height:"30px"}}/> */}
                                                {/* <i class="fa-solid fa-face-grin-tongue-squint"></i> */}
                                                <h6 className="mt-2">{auth?.user?.fullName}</h6>
                                                <hr className="user-dropdown-divider  p-0"/>
                                            </div>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin/dashboard" : "user/profile" }`} className="side-bar-item">
                                                <i class="fa-solid fa-user side-bar-item-icon"></i>
                                                <span className="side-bar-item-caption">Dashboard</span>
                                            </NavLink>
                                            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin/profile" : "user/profile" }`} className="side-bar-item">
                                                <i class="fa-solid fa-user side-bar-item-icon"></i>
                                                <span className="side-bar-item-caption">Profile</span>
                                            </NavLink>
                                            <a onClick={logout}  className="side-bar-item">
                                                
                                                <BsBoxArrowLeft  className=" side-bar-item-icon" />
                                                <span className="side-bar-item-caption">Logout</span>
                                            </a>
                                        </div>
                                    </div>
                                 </div>
                                 
                            // <div class="dropdown-center ms-2">
                            //     <button class="main-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            //     <img
                            //         className="profile-img me-2"
                            //         src={`data:${auth?.user?.photo?.contentType};base64,${Buffer.from(photoData).toString("base64")}`}
                            //         alt=""
                            //         style={{ width: "30px", height: "30px" }}
                            //     />
                            //         {auth?.user?.fullName}
                            //     </button>
                            //     <ul class="dropdown-menu">
                            //         <li className="nav-item">
                            //         <NavLink className="nav-link " aria-current="page" to={`/dashboard/${auth?.user?.role === 1 ? "admin/dashboard" : "user/profile" }`}>
                            //             <i className=" me-2 fa-solid fa-border-none"></i>  DASHBOARD
                            //         </NavLink>
                            //         </li>
                            //         <li><hr class="dropdown-divider"/></li>
                            //         <li className="nav-item">
                                    // <NavLink onClick={logout} to="/login" className="nav-link " aria-current="page">
                                    //     <i className=" me-2 fa-solid fa-right-from-bracket"></i>  LOGOUT
                                    // </NavLink>
                            //         </li>
                            //     </ul>
                            // </div>
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