import React from 'react';
import "../../assets/css/footer.css";
import logo1 from "../../assets/img/ZayanShop.png"
import logo from "../../assets/img/ZayanShop2.png"
import logo2 from "../../assets/img/Logo-ah.png"
const Footer = () => {
    return (
        <div className='my-footer overflow-hidden'>
            <div className="footer-cta row text-center  bg-light">
                
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-file-lines"></i></p>
                            <p>Terms & conditions</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-person-walking-arrow-loop-left"></i></p>
                            <p>return policy</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-life-ring"></i></p>
                            <p>Support Policy</p>
                        </div>
                    </div>
                    </a>
                </div>
                <div className="col-xl-3 col-md-3 mb-30 border-end">
                    <a href="#">
                    <div className="single-cta p-4">
                        <div className="cta-text">
                        <p><i class="fa-solid fa-circle-info"></i></p>
                            <p>privacy policy</p>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
            <footer className="footer-section">
                <div className="container">
                    <div className="footer-content pt-5 pb-">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <a href="#"><img src={logo} className="img-fluid" alt="logo"/></a>
                                    </div>
                                    <div className="footer-text">
                                        <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                        elit,Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">about</a></li>
                                        <li><a href="#">services</a></li>
                                        <li><a href="#">portfolio</a></li>
                                        <li><a href="#">Contact</a></li>
                                        <li><a href="#">About us</a></li>
                                        <li><a href="#">Our Services</a></li>
                                        <li><a href="#">Expert Team</a></li>
                                        <li><a href="#">Contact us</a></li>
                                        <li><a href="#">Latest News</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-widget-heading">
                                        <h3>Subscribe</h3>
                                    </div>
                                    <div className="footer-text mb-25">
                                        <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                    </div>
                                    <div className="subscribe-form">
                                        <form action="#">
                                            <input className='form-control' type="text" placeholder="Email Address"/>
                                            <button className=' rounded-end'><i className="fab fa-telegram-plane"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section id="contact" class="footer_wraper mt-3 mt-md-0">
                    <div class="container">
                        <div class="row align-items-center">
                        <div class="col-lg-4 col-md-6 text-center text-md-start">
                            <div class="footer-logo mb-3 mb-md-0 text-lg-center">
                            <img src={logo2} class="img-fluid" alt="" style={{height:'50px' , width:"auto"}}/>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <ul class="list-unstyled d-flex justify-content-center justify-content-md-end justify-content-lg-center social-icon mb-3 mb-md-0">
                            <li>
                                <a href="https://www.instagram.com/amirhamja360/"  target="_blank"><i class="fab fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/amirhamja360/"  target="_blank"><i class="fab fa-facebook-f"></i></a>
                            </li>
                            <li>
                                <a href="https://twitter.com/amirhamja360"  target="_blank"><i class="fab fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/amirhamja656/"  target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            </li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-12 float-end">
                            <div class="copyright-text text-lg-start text-center mb-3 mb-lg-0">
                            <p class="mb-0">Copyright © 2022 <a href="#">Amir_hamza</a>. All Rights Reserved.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </footer>
        </div>
    );
};

export default Footer;