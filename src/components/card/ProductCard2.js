import React from 'react';
import './card.css'
const ProductCard2 = ({p}) => {
    return (
        <div className='col-md-3'>
            <div className="card my-card mx-2 mb-4">
                <img
                    className='rounded-top w-100'
                    src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`}
                    alt="name"
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className=' card-body px-3 pb-0 '>
                    <h6>{p?.title}</h6>
                    <h6> Price: {p?.price} </h6>
                </div>
                <div className='px-3'>
                    <a className=' text-primary mx-1 pointer' style={{fontSize:"17px"}}><i class="fa-solid fa-cart-shopping"></i></a>
                    <a className=' text-danger mx-1 ps-2 pointer' style={{fontSize:"17px"}}><i class="fa-regular fa-heart"></i></a>
                    <a className=' text-danger mx-1 ps-2 pointer' style={{fontSize:"17px"}}><i class="fa-solid fa-heart"></i></a>
                </div>
                <button className='m-3 secondary-btn  ' style={{fontSize:"14px"}}>View Product</button>
            </div>
            {/* <div class="my-item">
                <div class="img-box">
                <img src="https://source.unsplash.com/1-nx1QR5dTE" alt="Awesome Sunglasses"/>
                </div>
                <div class="details">
                <h2>Awesome Sunglasses<br /><span>Men's Collection</span></h2>
                 <h2>Price: $100</h2>
                 
                <label>Color</label>
                <ul class="colors">
                    <li><i className="text-primary fa-solid fa-eye"></i></li>
                    <li><i className="text-danger fa-regular fa-heart"></i></li>
                    <li><i className="text-danger fa-solid fa-heart"></i></li>
                </ul>
                <a className='secondary-btn w-100' href="#">Add to cart</a>
                </div>
            </div> */}
        </div>
    );
};

export default ProductCard2;