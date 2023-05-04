import React from 'react';
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { FaDollarSign, FaProjectDiagram, FaRegClock, FaCheck, FaTimes, FaWarehouse, FaRocket, FaUserCircle } from "react-icons/fa";
import ProductCard from '../components/card/ProductCard';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import image from '../assets/img/image404.jpeg'
import { toast } from 'react-hot-toast';
import { BsStarHalf, BsStarFill } from 'react-icons/bs';
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext';

const ProductView = () => {

    const [auth, setAuth] = useAuth();

    const [review, setReview] = useState([]);
    const [product, setProduct] = useState({});
    const [cartProductId, setCartProductId] = useState("");
    const [related, setRelated] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [content, setContent] = useState("");

// console.log("product",product)

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        loadProduct();
    }, [params?.slug]);

    const loadProduct = async () => {
        try {
        const token = localStorage.getItem('token');
          const { data } = await axios.get(`/product/${params.slug}`, { headers: { Authorization: auth?.token } });
          setProduct(data);
          setCartProductId(data._id);
          loadRelated(data._id, data.category[0]._id);
          loadReview(data._id);
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

    const addToCart = async () => {
        try {
          const {data} = await axios.post('/cart', { productId: cartProductId, quantity });
          const productId = cartProductId
          const itemIndex = data.items.findIndex(item => item.product === productId);
          if (itemIndex !== -1) {
            const countQuantity = data.items[itemIndex].quantity;
            toast.success(`${countQuantity} Item Add to Cart Successfully`);
          }
        }
        catch (error) {
          console.error(error);
          toast.error('Could not add item to cart');
          navigate(`/login`, { state: location.pathname, });
        }
      };

    const loadReview =async (productId) =>{
    try{
        const token = localStorage.getItem('token'); // get the token from local storage
        const { data } = await axios.get(`/review/${productId}`, { headers: { Authorization: token } });
        setReview(data);
    }
    catch(error){
        console.log(error);
    }
    }

    const submitReview = async (e) => {
        e.preventDefault()
        try {
          const {data} = await axios.post('/review', { product: cartProductId, content , rating: 5 });
            toast.success('Review Add Successfully');
            setContent("")
            loadProduct();
        }
        catch (error) {
          console.error(error);
          toast.error('Could not add item to Review');
          navigate(`/login`, { state: location.pathname, });
        }
      };

      // Delete sweetalert2
    const handleDelete = async ( id ) =>{
        
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await axios.delete(`/review/${id}`);
            loadProduct();
            return result;
        }
    }

    const handleIncrement = () => {
        if (quantity < 12) {
        setQuantity(quantity + 1);
        }
      };
      
    const handleDecrement = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
    };


    return (
        <div>
            <div className="container">
                <div className="  bg-light mt-5">
                    <div className="row p-4 d-flex align-items-center">
                        <div className="col-md-5">
                            <div className=" text-center " >
                                <img className="rounded align-middle py-3" src={`${process.env.REACT_APP_API}/product/photo/${product._id}`} alt={product?.title} style={{width:"100%", height:"100%", objectFit: "cover"}}/>
                            </div>
                        </div>

                        <div className="col-md-7 ">
                            <h3>{product?.title}</h3>
                            <hr />
                            <div className="d-flex w-50 my-2">
                               <small className='text-warning'> <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf/> </small> <a className='small ms-2' href="">{review?.length} Reviews</a>
                            </div>
                            <div className="d-flex w-50 my-2">
                                <small> Category: <a className='small' href={`/category/${product?.category?.map(c => c?.slug)} `} >{product?.category?.map(c => c?.name) }</a></small>
                                <small className=' ms-3'> Brand: <a className=' small' href={`/category/${product?.brand?.slug}`}>{product?.brand?.name }</a></small>
                            </div>
                            <div className="d-flex w-50">
                                <p className=" text-success rounded me-5">{`${product?.quantity >= 1 ? `${product?.quantity} in stock` : "Out of stock" }`}</p>
                            </div>
                            <p className="fw-bold fs-5">
                            Price:{" "}
                            {product?.price?.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                            </p>
                            <div className=" d-flex pb-2">
                                <p className='m-2 ms-0'> Quantity: </p>
                            {/* <input
                                type="number"
                                className="form-control"
                                style={{
                                    width: "100px",
                                }}
                                defaultValue={quantity}
                                // defaultValue={ items?.quantity ? items?.quantity : 1 }
                                min="1"
                                max="12"
                                onChange={(e) => setQuantity(e.target.value) }
                            /> */}
                            <div className="btn-group">
                                <button 
                                    onClick={handleDecrement} 
                                    className="form-control form-control-sm bg-light h-75" 
                                    style={{borderRadius:"20px 0px 0px 20px", width:"35px"}}>-</button>
                                <input 
                                    type="text" id="inc" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value) } 
                                    className="form-control form-control-sm h-75 text-center" 
                                    style={{borderRadius:"0px 0px 0px 0px", width:"50px"}}/>
                                <button 
                                    onClick={handleIncrement}
                                    className="form-control form-control-sm bg-light h-75"  
                                    style={{borderRadius:"0px 20px 20px 0px", width:"35px"}}>+</button>
                            </div>
                            </div>
                            {/* <button className="btn btn-primary me-2">Buy Now</button> */}
                            <button onClick={addToCart} className="secondary-btn">Add to Cart</button>
                        </div>
                    </div>
                </div>

                <nav className='mt-5 bg-light'>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Description</button>
                        <button class="nav-link" id="nav-review-tab" data-bs-toggle="tab" data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">Reviews ({review?.length})</button>
                    </div>
                </nav>
                    <div class="tab-content bg-light" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                        <div className=" bg-light">
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
                                        <FaProjectDiagram /> Category: {product?.category?.map(c => <span>{c?.name}</span>) }
                                        </p>

                                        <p>
                                        <FaProjectDiagram /> Category: {product?.brand?.name }
                                        </p>

                                        <p>
                                        <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                                        </p>

                                        <p>
                                        {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                                        {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                                        </p>

                                        <p>
                                        <FaWarehouse /> Available {product?.quantity}
                                        {/* <FaWarehouse /> Available {product?.quantity - product?.sold} */}
                                        </p>

                                        <p>
                                        <FaRocket /> Sold {product.sold}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab" tabindex="0">
                            {review?.length ? (
                                <div className=" p-3">
                                    <h4>Ratings & Reviews of {product?.title}</h4>
                                    
                                    {review?.map((r)=>(
                                        <div className="w-100 mt-2 d-flex align-items-center">
                                            <div className="pe-2">
                                                <FaUserCircle style={{width:"40px", height:"40px"}}/>
                                            </div>
                                            <div className=" border w-100 p-2">
                                                <small className='text-warning'> <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf/> </small>
                                                    <p className='mt-0 small w-100' > {r?.user?.fullName} </p>
                                                <div className=" d-flex ">
                                                    <p className='mt-0' >{r?.content}</p> 
                                                    
                                                </div>
                                            </div>
                                            <div className="">
                                                <p onClick={""} className="pointer ms-auto p-2"><i class="fa-solid fa-pen-to-square text-primary"></i></p>
                                                <p onClick={handleDelete.bind(this, r?._id)} className="pointer p-2"><i class="fa-solid fa-trash-can text-danger"></i></p>
                                            </div>
                                                
                                        </div>
                                        // <div className="w-100 mt-2">
                                        //         <small className='text-warning'> <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarHalf/> </small>
                                        //             <p className='mt-0 small w-100' ><FaUserCircle/> {r?.user?.fullName} </p>
                                        //         <div className=" d-flex ">
                                        //             <p className='mt-0' >{r?.content}</p> 
                                        //             <p onClick={""} className="pointer ms-auto p-2"><i class="fa-solid fa-pen-to-square text-primary"></i></p>
                                        //             <p onClick={handleDelete.bind(this, r?._id)} className="pointer p-2"><i class="fa-solid fa-trash-can text-danger"></i></p>
                                        //         </div>
                                        //         <hr />
                                        // </div>
                                    ))}  
                                </div>
                            ) : (
                            <p className='text-center'><img src={image} alt=""/></p>
                            )}
                            <form onSubmit={submitReview} className=" d-flex">
                                <input value={content} onChange={(e)=> setContent(e.target.value)} className='form-control border-0 px-5'  type="text" style={{borderRadius:"40px" , background:"#13aa6e2a"}} ></input>
                                <button type='submit' className='secondary-btn' style={{borderRadius:"40px" , marginLeft:"-50px"}}>Send</button>
                            </form>
                        </div>
                    </div>

                <div className="row mt-4 bg-light mb-5">
                    <h2>Related Products</h2>
                    <hr />
                    {related?.length < 1 && <p className='text-center'><img src={image} alt=""/></p>}
                    {related?.map((p)=>(
                        <div className="col-md-3 mb-4">
                            <ProductCard p={p} key={p._id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductView;