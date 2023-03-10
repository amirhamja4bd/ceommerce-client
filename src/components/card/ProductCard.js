import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import "./product.css";

const ProductCard = ({p}) => {

  const [review, setReview] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadReview();
},[])

// category Load
const loadReview =async () =>{
    try{
        // loader.classList.remove("d-none")
        const { data } = await axios.get(`/review/${p._id}`);
        setReview(data);
        // loader.classList.add("d-none")
    }
    catch(error){
        console.log(error);
    }
}
const addToCart = async () => {
  try {
    const {data} = await axios.post('/cart', { productId: p._id, quantity });
    toast.success('Added to cart successfully')
    console.log(data);
  } 
  catch (error) {
    console.error(error);
    toast.error('Could not add item to cart');
    navigate(`/login`, { state: location.pathname, });
  }
};


  return (
    <>
      <div class="mx-2">
        <div class="product-grid">
          <div class="product-image">
            <a  class="image">
            <img
                className='rounded-top w-100 pic-1'
                src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`}
                alt="name"
                style={{ height: "200px", objectFit: "cover" }}
            />
            <img
                className='rounded-top w-100 pic-2'
                src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`}
                alt="name"
                style={{ height: "200px", objectFit: "cover" }}
            />
            </a>
            <span class="product-new-label" data-bs-toggle="Quantity" data-bs-placement="top">{p?.quantity}</span>
            {/* <span class="product-new-label" data-tooltip="Quantity">{p?.quantity}</span> */}
            <ul class="product-links">
              <li>
                <a href="#">
                  <i class="fa fa-heart"></i>
                </a>
              </li>
              <li>
                <a onClick={addToCart} className="pointer" >
                  <i class="fa fa-shopping-cart"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="product-content">
            <div>
              <ul class="list-unstyled list-inline rating mb-2">
                <li class="list-inline-item">
                  <i class="fa fa-star"></i>
                </li>
                <li class="list-inline-item">
                  <i class="fa fa-star"></i>
                </li>
                <li class="list-inline-item">
                  <i class="fa fa-star"></i>
                </li>
                <li class="list-inline-item">
                  <i class="fa fa-star"></i>
                </li>
                <li class="list-inline-item">
                  <i class="fa fa-star-o"></i>
                </li>
                ({review?.length})
              </ul>
            </div>
            <h3 class="title">
              <a className='pointer'  onClick={() => navigate(`/product/${p?.slug}`)} >{p?.title}</a>
            </h3>
            <ul class="list-unstyled list-inline ">
              <li class="list-inline-item price" >${p?.price}</li>
              <li class="list-inline-item price2">15% off</li>
            </ul>
            <button onClick={() => navigate(`/product/${p?.slug}`)} className='mt-2 secondary-btn w-100 ' style={{fontSize:"14px"}}>View Product</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;