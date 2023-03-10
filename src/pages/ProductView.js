import React from 'react';
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
    FaDollarSign,
    FaProjectDiagram,
    FaRegClock,
    FaCheck,
    FaTimes,
    FaWarehouse,
    FaRocket,
  } from "react-icons/fa";
import ProductCard from '../components/card/ProductCard';
import { useParams } from "react-router-dom";
import image from '../assets/img/image404.jpeg'

const ProductView = () => {

    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);

    const params = useParams();

    useEffect(() => {
        if (params?.slug) loadProduct();
    }, [params?.slug]);

    const loadProduct = async (req, res) => {
        try {
          const { data } = await axios.get(`/product/${params.slug}`);
          setProduct(data);
          loadRelated(data._id, data.category[0]._id);
        } catch (err) {
          console.log(err);
        }
    };

    const loadRelated = async (productId, categoryId) => {
        try {
          const { data } = await axios.get(
            `/related-products/${productId}/${categoryId}`
          );
          setRelated(data);
        } catch (err) {
          console.log(err);
        }
    };


    return (
        <div>
            <div className="container">
                <div className="  bg-light mt-5">
                    <div className="row p-4">
                        <div className="col-md-3">
                            <div className="">
                                <img className="rounded" src={`${process.env.REACT_APP_API}/product/photo/${product._id}`} alt={product?.title} style={{width:"100%", maxWidth:"400px"}}/>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <h3>{product?.title}</h3>
                            <hr />
                            <div className="d-flex w-50">
                                <p className="p-1 rounded bg-white me-5">{`${product?.quantity >= 1 ? `${product?.quantity - product?.sold} in stock` : "Out of stock" }`}</p>
                                <p className="p-1 rounded bg-white">{`${product?.sold} sold`}</p>
                            </div>
                            <p className="fw-bold fs-5">
                            Price:{" "}
                            {product?.price?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            </p>
                            <button className="btn btn-primary me-2">Buy Now</button>
                            <button className="btn btn-outline-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>


                <div className=" bg-light mt-5">
                    <div className="row p-3">
                        <div className="col-md-8">
                            <h4 className="">Product Description</h4><hr />
                            <p className="card-text lead">{product?.description}</p>
                        </div>
                        <div className="col-md-4">
                            <h4 className="">Product Details</h4><hr />
                            <div>
                                <p>
                                <FaDollarSign /> Price:{" "}
                                {product?.price?.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                                </p>

                                <p>
                                <FaProjectDiagram /> Category: {product?.category?.name}
                                </p>

                                <p>
                                <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                                </p>

                                <p>
                                {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                                {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                                </p>

                                <p>
                                <FaWarehouse /> Available {product?.quantity - product?.sold}
                                </p>

                                <p>
                                <FaRocket /> Sold {product.sold}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <h2>Related Products</h2>
                    <hr />
                    {related?.length < 1 && <p className='text-center'><img src={image} alt=""/></p>}
                    {related?.map((p)=>(
                        <div className="col-md-3">
                            <ProductCard p={p} key={p._id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductView;