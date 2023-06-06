import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import "./product.css";
// import { useCart } from '../../context/CartContext';
import { useGlobalContext } from "../../context/GlobalContext";

const ProductCard = ({p}) => {
  const { checkCountCart , checkCountWish } = useGlobalContext();

  const [review, setReview] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const[wishList, setWishList] = useState([]);
  // const[carts, loadCarts, countCart] = useCart();

// console.log("jhon", checkCountCart())
// console.log('Preview',p);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadReview();
    loadWishList();
},[])

// Review Load
const loadReview =async () =>{
    try{
        const { data } = await axios.get(`/review/${p?._id}`);
        setReview(data);
    }
    catch(error){
        console.log(error);
    }
}
const addToCart = async () => {
  try {
    const {data} = await axios.post('/cart', { productId: p?._id, quantity });
    const productId = p._id
    const itemIndex = data.items.findIndex(item => item.product === productId);
    if (itemIndex !== -1) {
      const countQuantity = data.items[itemIndex].quantity;
      toast.success(`${countQuantity} Item Add to Cart Successfully`);
    }
    checkCountCart();
  }
  catch (error) {
    console.error(error);
    toast.error('Could not add item to cart');
    navigate(`/login`, { state: location.pathname, });
  }
};

const addWishList = async () => {
  try {
    const {data} = await axios.post('/create-wishlist', { product: p?._id, isLiked: true });
      toast.success('Item Add to WishList Successfully');
  }
  catch (error) {
    console.error(error);
    toast.error('Could not add item to WishList');
    navigate(`/login`, { state: location.pathname, });
  }
};

const loadWishList = async () => {
  try {
    const token = localStorage.getItem('token'); // get the token from local storage
    const { data } = await axios.get(`/wishlist/${p?._id}`, { headers: { Authorization: token } });
    setWishList(data.wishlist);
    checkCountWish()
  } catch (err) {
    console.log(err);
  }
};


  return (
    <>
      <div class="mx-1 ">
        <div class="product-grid">
          <div class="product-image">
            <a  class="image">
            <img
                className='rounded-top w-100 pic-1'
                src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`}
                alt="name"
                style={{ height: "150px", objectFit: "cover" }}
            />
            <img
                className='rounded-top w-100 pic-2'
                src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`}
                alt="name"
                style={{ height: "150px", objectFit: "cover" }}
            />
            </a>
            {/* {p?.type === 'new' || p?.type === 'sale' && (
            <span class="product-new-label" data-bs-toggle="Quantity" data-bs-placement="top">{p?.type}</span>
            )} */}
            {/* <span class="product-new-label" data-bs-toggle="Quantity" data-bs-placement="top">{p?.type}</span> */}
            <ul class="product-links">
              <li>
                <a onClick={addWishList} className='pointer' >
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
                <i class="fa-solid fa-star-half-stroke"></i>
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