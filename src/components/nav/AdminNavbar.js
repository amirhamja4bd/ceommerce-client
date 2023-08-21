import React, {Fragment, useRef} from "react";
import {Container,Navbar, NavDropdown} from "react-bootstrap";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import '../../assets/css/sidebar.css'
import '../../assets/css/dropdownmenu.css'
import {  BsBoxArrowLeft, BsCartCheck , BsCalendarRange } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import Accordion from 'react-bootstrap/Accordion';
import { Buffer } from 'buffer';

const image ="https://raw.githubusercontent.com/amirhamja4bd/portfolio-html/main/images/ZayanShop.png"

const AdminNavbar = (props) => {

    const[auth, setAuth] = useAuth();
    const navigate = useNavigate();

    let contentRef,sideNavRef=useRef();

    const onLogout=()=>{
        
    }

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };

    const logout = () => {
        setAuth({ ...auth, user: null, token: "" })
        localStorage.removeItem("auth")
        localStorage.removeItem("token")
        navigate("/login")
    }

    const photoData = auth?.user?.photo?.data || '';

    return (
        <Fragment>
            <Navbar  className="fixed-top px-5 shadow-sm my-nav bg-white" >
                <Container fluid={true}>
                    <Navbar.Brand >
                        <a className="icon-nav m-0 h5 me-5 pointer" onClick={MenuBarClickHandler}> 
                        <i class="fa-solid fa-bars"></i>
                        </a>
                        <a href="/"><img  src={image} alt="" className="" style={{width:"auto", height:"40px"}} /></a>
                        {/* <img className="nav-logo mx-2"  src={logo} alt="logo"/> */}

                    </Navbar.Brand>
                    
                    <div className="float-right h-auto d-flex ">
                        <div className="user-dropdown ">
                            <div className="d-flex my-bg-primary px-1 pt-1" style={{borderRadius:"40px"}}>
                                <p className="align-middle pe-2 text-light pt-2 text-dark" >
                                <img
                                    className="profile-img me-2"
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
                                <NavLink to="/dashboard/admin/profile" className="side-bar-item">
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
                </Container>
            </Navbar>

            <div ref={(div) =>{sideNavRef=div}} className="side-nav-open ">

                <NavLink   className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-4" : "side-bar-item mt-2" }  to="/dashboard/admin/dashboard"   end>
                    <i class="fa-solid fa-user side-bar-item-icon"></i>
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>
                
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/dashboard/admin/category" >
                    <i class="fa-solid fa-pen-to-square side-bar-item-icon"></i>
                    <span className="side-bar-item-caption">Create Category</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/dashboard/admin/brand" >
                    <i class="fa-solid fa-pen-to-square side-bar-item-icon"></i>
                    <span className="side-bar-item-caption">Create Brand</span>
                </NavLink>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        {/* <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }> */}
                            <Accordion.Header   style={{fontWeight:"500", fontSize:"13px" , fontFamily:"'Poppins', sans-serif"}}><i class="fa-solid fa-pen-to-square side-bar-item-icon ps-1"></i>Product</Accordion.Header>
                        {/* </NavLink> */}
                        <Accordion.Body>
                            <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/dashboard/admin/product" >
                                <i class="fa-regular fa-circle-dot side-bar-item-icon fs-6"></i>
                                <span className="side-bar-item-caption">Create Product</span>
                            </NavLink>

                            <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/dashboard/admin/products" >
                                <i class="fa-regular fa-circle-dot  side-bar-item-icon fs-6"></i>
                                <span className="side-bar-item-caption">In House Product</span>
                            </NavLink>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/dashboard/admin/coupon" >
                    <BsCalendarRange className=" side-bar-item-icon"/>
                    <span className="side-bar-item-caption">Coupon</span>
                </NavLink>
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/dashboard/admin/orders" >
                    <BsCartCheck className=" side-bar-item-icon"/>
                    <span className="side-bar-item-caption">Orders Manage</span>
                </NavLink>

            </div>

            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>

        </Fragment>
    );
};

export default AdminNavbar;