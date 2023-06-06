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
import HTMLRenderer from '../helper/HTMLRender';
import { useGlobalContext } from '../context/GlobalContext';
import { FaStar } from 'react-icons/fa';
import { Popconfirm } from 'antd';

const ProductView = () => {

    const [auth, setAuth] = useAuth();
    const { checkCountCart , checkCountWish } = useGlobalContext();

    const [review, setReview] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [ratingUpdate, setRatingUpdate] = React.useState(0);
    const [product, setProduct] = useState({});
    const [cartProductId, setCartProductId] = useState("");
    const [related, setRelated] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [content, setContent] = useState("");
    const [updatedContent, setUpdatedContent] = useState('');
    const [expandedComments, setExpandedComments] = React.useState([]);

    const toggleComment = (index) => {
        setExpandedComments((prevExpandedComments) => {
        const newExpandedComments = [...prevExpandedComments];
        newExpandedComments[index] = !newExpandedComments[index];
        return newExpandedComments;
        });
    };

console.log("updatedContent",updatedContent)
// console.log("rav",review?._id)
// console.log("reviews",review)

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
            checkCountCart()
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
          const {data} = await axios.post(`/review/${product?._id}`, { product: cartProductId, content: comment , rating: rating });
        if(data?.error){
            console.log(data?.error);
            toast.error(data?.error)
        }
        else{
          toast.success('Review Add Successfully');
            setRating(0);
            setComment('');
            loadProduct();
        }
        }
        catch (error) {
          console.error(error);
          toast.error(error?.response?.data?.error);
        //   navigate(`/login`, { state: location.pathname, });
        }
      };

    const updateReview = async (reviewId) => {
        // e.preventDefault()
        console.log(`Update`, reviewId);
        try {
          const {data} = await axios.put(`/review/${reviewId}/${product?._id}`, { rating: ratingUpdate, content: updatedContent  });
        if(data?.error){
            console.log(data?.error);
            toast.error(data?.error)
        }
        else{
          toast.success('Review Update Successfully');
            setRatingUpdate(0);
            setUpdatedContent('');
            loadProduct();
            setExpandedComments([]);
        }
        }
        catch (error) {
          console.error(error);
          toast.error(error?.response?.data?.error);
        }
      };

      // Delete sweetalert2
    // const handleDelete = async ( id ) =>{
        
    //     const result = await Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     });
    //     if (result.isConfirmed) {
    //         await axios.delete(`/review/${id}`);
    //         loadProduct();
    //         return result;
    //     }
    // }
    const handleDelete = async (id) => {
        try {
          await axios.delete(`/review/${id}`);
          loadProduct();
        } catch (error) {
          // Handle error
        }
      };

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

    const handleRatingChange = (value) => {
        setRating(value);
      };
    
      const handleReviewCreate = (event) => {
        setComment(event.target.value);
      };
      
      const handleRatingUpdate = (value) => {
        setRatingUpdate(value);
        console.log("val",value);
      };

      const generateStars = (reviews) => {
        const stars = [];
        for (let i = 1; i <= reviews; i++) {
          stars.push(
            <FaStar key={i} className="text-warning inline-block mr-1" />
          );
        }
        return stars;
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
                                    <p className="lead">{ <HTMLRenderer htmlString={product?.description}/>}</p>
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
                                <div className=" p-3 ">
                                    <h5 className='pb-4'>Ratings & Reviews of {product?.title}</h5>
                                    
                                    {review?.map((r , i)=>(
                                      
                                        <div className="w-100 mt-2 d-flex align-items-start">
                                            <div className="pe-2">
                                                <img src={`${process.env.REACT_APP_API}/user/photo/${r?.user?._id}`} className='shadow rounded-circle'  style={{width:"50px", height:"50px"}} alt="rp" />
                                            
                                                {/* <FaUserCircle style={{width:"50px", height:"50px"}}/> */}
                                            </div>
                                            <div className=" border rounded w-100 p-2">
                                                <div className="d-flex justify-content-between " style={{ height: '25px' }}>
                                                <div className="">{generateStars(r?.rating)}</div>
                                                    {auth.user._id === r?.user?._id &&
                                                    <div className="d-flex">
                                                        <p onClick={() => toggleComment(i)} className="pointer mx-3"><i className="fa-solid fa-pen-to-square text-primary"></i></p>
                                                        <p className="pointer mx-2">
                                                            <Popconfirm
                                                                title="Are you sure? You Delete this review"
                                                                onConfirm={() => handleDelete(r?._id)}
                                                                okText="Yes"
                                                                cancelText="No"
                                                            >
                                                                <i className="fa-solid fa-trash-can text-danger"></i>
                                                            </Popconfirm>
                                                        </p>
                                                    </div>
                                                    }
                                                </div>
                                                
                                                    <p className='mt-0 small w-100' > {r?.user?.fullName || 'Inactive User'} </p>
                                                {expandedComments[i] ? (
                                                <>
                                                <div className="">
                                                    {[...Array(5)].map((_, index) => {
                                                        const ratingValue = index + 1;
                                                        return (
                                                        <FaStar
                                                            key={index}
                                                            className={`star ${ratingValue <= ratingUpdate ? 'text-warning' : 'text-secondary'}`}
                                                            size={18}
                                                            onClick={() => handleRatingUpdate(ratingValue)}
                                                        />
                                                        );
                                                    })}
                                                    <textarea
                                                    className="w-100 form-control bg-light my-2"
                                                    defaultValue={r?.content}
                                                    onChange={(e) => { setUpdatedContent(e.target.value) }}
                                                    // onChange={handleContentChange}
                                                    ></textarea>
                                                </div>
                                                    <button onClick={updateReview.bind(this, r?._id)} className='secondary-btn'>Update Review</button>
                                                </>
                                                ) : (
                                                <>
                                                    <p className=' mt-0'>{r?.content}</p>
                                                </>
                                                )}
                                            </div>
                                                
                                        </div>
                                    ))}  
                                </div>
                            ) : (
                            <p className='text-center'><img src={image} alt=""/></p>
                            )}


                            <div className="container">
                                <h5 className='mt-4'>Add Your Review</h5>
                                <form onSubmit={submitReview}>
                                    <div className="form-group ">
                                    <h6 className='text-secondary pt-2 pb-1 m-0' htmlFor="rating ">Your Rating*</h6>
                                    <div className='mb-3'>
                                        {[...Array(5)].map((_, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                            <FaStar
                                            key={index}
                                            className={`star ${ratingValue <= rating ? 'text-warning' : 'text-secondary'}`}
                                            size={18}
                                            // color={ratingValue <= rating ? 'gold' : 'gray'}
                                            onClick={() => handleRatingChange(ratingValue)}
                                            />
                                        );
                                        })}
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <h6 className='text-secondary pb-1 pt-2' htmlFor="comment">Your Review*</h6>
                                    <textarea
                                        className="form-control bg-light"
                                        id="comment"
                                        rows="5"
                                        value={comment}
                                        onChange={handleReviewCreate}
                                    />
                                    </div>
                                    <button type="submit" className="secondary-btn mt-3">Submit</button>
                                </form>
                            </div>

                            {/* <form onSubmit={submitReview} className=" d-flex">
                                <input value={content} onChange={(e)=> setContent(e.target.value)} className='form-control border-0 px-5'  type="text" style={{borderRadius:"40px" , background:"#13aa6e2a"}} ></input>
                                <button type='submit' className='secondary-btn' style={{borderRadius:"40px" , marginLeft:"-50px"}}>Send</button>
                            </form> */}
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