import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/card/ProductCard';
import { NavLink } from 'react-router-dom';
import "../assets/css/carousel.css";
import DiscountBanner from '../components/nav/DiscountBanner';

const Home = () => {

    const [products, setProducts ] = useState([]);
    const [category, setCategory] = useState([]);

    let loader = useRef();

    useEffect(() => {
        loadProducts();
        loadCategories();
    },[])


    // category Load
    const loadCategories =async () =>{
        try{
            // loader.classList.remove("d-none")
            const { data } = await axios.get('/categories');
            setCategory(data);
            // loader.classList.add("d-none")
        }
        catch(error){
            console.log(error);
        }
    }

    const loadProducts = async () => {
        try{
            // loader.classList.remove("d-none")
            const {data} = await axios.get('/products');
            setProducts(data);
            // loader.classList.add("d-none")
        }
        catch(error){
            console.log(error);
        }
    };

    // Carousel
    let newP = document.querySelector('.new-product');
    let sell = document.querySelector('.bestSellProduct');

    const btnprev = () => {
        let width = newP.clientWidth;
        newP.scrollLeft = newP.scrollLeft - width;
        console.log(width)
    }

    const btnnext = () => {
        let width = newP.clientWidth;
        newP.scrollLeft = newP.scrollLeft + width;
        console.log(width)
    }

    const sellbtnprev = () => {
        let width = sell.clientWidth;
        sell.scrollLeft = sell.scrollLeft - width;
        console.log(width)
    }

    const sellbtnnext = () => {
        let width = sell.clientWidth;
        sell.scrollLeft = sell.scrollLeft + width;
        console.log(width)
    }

    //Best selling products
    const sortedProduct = [...products];
    const sortedBySold = sortedProduct?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

    return (
        <div>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <NavLink className=" card-header nav-link primary-bg text-light" aria-current="page" to="/categories">
                            <i class="fa-solid fa-list"></i> Categories
                            </NavLink>
                            <div className="card-body overflow-auto cat-scroll" style={{maxHeight:"290px"}}>
                                {category?.map((c)=>(
                                    <NavLink className="nav-link" to={`/category/${c?.slug}`}><p>{c?.name}</p></NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner  rounded">
                            <div class="carousel-item active" data-bs-interval="2000">
                            <img src="https://takesell.com.bd/public/uploads/all/64EvjvsKlThaX0q8aAfuWQqcathPQFjSAk54ymTz.png" class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img src="https://takesell.com.bd/public/uploads/all/KrrXDmK45sUtau4v36ITtgvPe7uyVKGnCTJYRb8B.png" class="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                        </div>
                    </div>
                </div>
                <section >
                    <div className="product-carousel container mx-auto bg-light shadow-sm my-3">
                        <h4 className="mt-1 ms-1 p-2"> New Arrivals </h4>

                        <button className="pre-btn" onClick={btnprev}><i className="fa-solid fa-chevron-left  text-white fs-1 py-1 px-2 rounded"></i></button>
                        <button className="next-btn" onClick={btnnext}><i className="fa-solid fa-chevron-right text-white fs-1 py-1 px-2 rounded"></i></button>

                        <div className="new-product pb-5 mx-2 ">
                            {products?.map((p)=>(
                                <div key={p._id} className="col-md-3 ">
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section >
                    <div className="product-carousel container mx-auto  bg-light shadow-sm my-3">
                        <h4 className="mt-1 ms-1 p-2 "> Best Selling Products </h4>

                        <button className="pre-btn" onClick={sellbtnprev}><i className="fa-solid fa-chevron-left text-white fs-1 py-1 px-2 rounded"></i></button>
                        <button className="next-btn" onClick={sellbtnnext}><i className="fa-solid fa-chevron-right text-white fs-1 py-1 px-2 rounded"></i></button>

                        <div className="bestSellProduct pb-5 ">
                            {sortedBySold?.map((p)=>(
                                <div key={p._id} className="col-md-3">
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <DiscountBanner/>
        </div>
    );
};

export default Home;