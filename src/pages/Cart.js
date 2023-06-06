import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './cart.css'
import Checkout from '../components/card/Checkout';
import { Button, Result } from 'antd';
import { useGlobalContext } from '../context/GlobalContext';


const Cart = () => {

    const[carts, setCarts] = useState([]);
    const [auth, setAuth ] = useAuth();
    const [code, setCode] = React.useState('');
    const { checkCountCart , checkCountWish } = useGlobalContext();

    const subTotal = carts?.items?.reduce((acc, item) => acc + item.totalPrice, 0);
    const discount = subTotal - carts?.total
    const shipping = 0
    const grandTotal = ((subTotal - discount) + shipping)

    const navigate = useNavigate();

    useEffect(() => {
        loadCarts();
    }, []);

    const loadCarts = async () => {
        try {
          const token = localStorage.getItem('token'); // get the token from local storage
          const { data } = await axios.get("/carts", { headers: { Authorization: token } });
          setCarts(data);
          checkCountCart()
        } catch (err) {
          console.log(err);
        }
    };

    const handleApplyCoupon = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
          const AuthToken = { headers: { 'Authorization': `Bearer ${token}` } }
          const {data} = await axios.get(`/coupons/${code}`, { headers: { Authorization: token } })
          if (data.error) {
            toast.error(data.error);
          } else {
            loadCarts();
            setCode('')
            toast.success('Coupon Applied Successfully');
          }
        } catch (err) {
          console.log(err)
          toast.error(err?.response?.data?.error)
        }
      }

    const handleDelete = async (items)=>{
        try {
        const deleteCart = await axios.delete(`/cart/${items._id}`);
        toast.success(" Delete cart successfully")
        loadCarts();
        }
        catch (error) {
        toast.error(error)
        console.error(error);
        }
    }

    const updateQuantity = async (quantity, itemId)=>{
        try {
        const updateQuant = await axios.put(`/cart`, { itemId , quantity });
        toast.success(" Update cart successfully")
        loadCarts();
        }
        catch (error) {
        toast.error(error)
        console.error(error);
        }
    }
    
    function handleDecrement(quantity, itemId) {
        if (quantity > 1) {
          updateQuantity(quantity - 1, itemId);
        }
      };
      
      function handleIncrement(quantity, itemId) {
        if (quantity < 12) {
          updateQuantity(quantity + 1, itemId);
        }
      };

    
    return (
        <div className=' overflow-hidden'>
            <div className=" py-4">
                {!carts?.items?.length &&
                <Result
                    title="You don't have any items in your cart"
                    extra={
                    <a href='shopping' className='main-btn' key="shopping">
                        Continue Shopping
                    </a>
                    }
                />
                    // <div className="text-center">
                    //     <button 
                    //         onClick={()=> navigate("/")}
                    //         className='secondary-btn'>Continue Shopping</button>
                    // </div>
                }
            </div>
            {carts?.items?.length > 0 && (
            <div class="container">
                <div className="row">
                    <div className=" rounded border col-md-8 mb-5 p-0 h-100">
                        <div className="d-flex justify-content-between col-md-8 bg-light mb-2 py-2 px-4 w-100">
                            <p>{carts?.items?.length} items</p>
                            <p>{carts?.items?.reduce((acc, product) => acc + product.quantity, 0)} Products</p>
                        </div>
                        {/* <div className="col-md-8 bg-light mb-2 py-2 px-4 w-100">{carts?.items?.length} item's , {carts?.items?.reduce((acc, product) => acc + product.quantity, 0)} Products</div> */}
                        <div className="row px-3">
                        <table class=" table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col"></th>
                                <th scope="col">Price</th>
                                <th scope="col"  className='text-center'>Quantity</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts?.items?.map((items, i)=>(
                                <tr className='align-middle'>
                                    <th scope="row">{i+1}</th>
                                    <td>
                                    <img
                                        src={`${process.env.REACT_APP_API}/product/photo/${items?.product?._id}`}
                                        alt={""}
                                        className="img img-fluid rounded"
                                        style={{ height: "90px", width:"90px", objectFit: "cover"}}
                                    />
                                    </td>
                                    <td className='pb-0 ms-0'> <p>{items?.product?.title}</p></td>
                                    <td>{items?.price.toLocaleString("en-US",{style:"currency", currency:"USD"})} </td>
                                    {/* <td>{items?.quantity} </td> */}
                                    <td  className='text-center'>
                                    {/* <input
                                        type="number"
                                        className="form-control"
                                        style={{
                                            width: "100px",
                                        }}
                                        defaultValue={ items?.quantity ? items?.quantity : 1 }
                                        min="1"
                                        max="12"
                                        onChange={(e) => updateQuantity( e.target.value , items?._id) }
                                    /> */}
                                        <div className="btn-group">
                                            <button 
                                                onClick={()=> 
                                                handleDecrement(items?.quantity, items?._id)} 
                                                className="form-control form-control-sm bg-light" 
                                                style={{borderRadius:"20px 0px 0px 20px", width:"35px"}}>-</button>
                                            <input 
                                                type="text" id="inc" value={items?.quantity ? items?.quantity : 1}  
                                                className="form-control form-control-sm text-center"  
                                                style={{borderRadius:"0px 0px 0px 0px", width:"50px"}}/>
                                            <button 
                                                onClick={()=> 
                                                handleIncrement(items?.quantity, items?._id)} 
                                                className="form-control form-control-sm bg-light" 
                                                style={{borderRadius:"0px 20px 20px 0px", width:"35px"}}>+</button>
                                        </div>
                                        
                                    </td>

                                    <td>{(items?.price * items?.quantity).toLocaleString("en-US",{style:"currency", currency:"USD"})} </td>
                                    <td>
                                        <div className="btn-group">
                                            <button key={items?._id}  onClick={handleDelete.bind(this, items)} className='btn btn-sm btn-danger bg-opacity-25 ms-1' style={{borderRadius:"50%"}}><i class="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="bg-light rounded p-3 mx-3 shadow-sm">
                            <h5 className=' border-bottom pb-2'>Order Summary</h5>
                            <div className=" "  style={{color:"#707070"}}>
                                <div className="d-flex justify-content-between pt-2">
                                    <h6>SubTotal</h6>
                                    <h6 className=' d-flex justify-content-end'>{subTotal.toLocaleString("en-US",{style:"currency", currency:"USD"})}</h6>
                                </div>
                                {carts?.couponApplied == true && (<>
                                <div className="d-flex justify-content-between pt-2">
                                    <h6>Discount</h6>
                                    <h6 className=' d-flex justify-content-end text-danger'>-{discount.toLocaleString("en-US",{style:"currency", currency:"USD"})}</h6>
                                </div>
                                </>)}
                                <div className="d-flex justify-content-between pt-2">
                                    <h6>Shipping Fee</h6>
                                    <h6 className=' d-flex justify-content-end'>{shipping.toLocaleString("en-US",{style:"currency", currency:"USD"})}</h6>
                                </div>
                                {carts?.couponApplied == false ? (
                                <form onSubmit={handleApplyCoupon} className=" d-flex pt-2">
                                    <input  
                                        value={code}
                                        onChange={(event) => setCode(event.target.value)}
                                        className='form-control form-control-sm border-0 ps-4'
                                        placeholder='Enter Coupon...'
                                        type="text" 
                                        style={{borderRadius:"40px" , background:"#13aa6e2a"}} 
                                        ></input>
                                    <button 
                                        type='submit'
                                        className='secondary-btn px-3' 
                                        style={{borderRadius:"40px" , marginLeft:"-50px"}}>Apply</button>
                                </form>
                                ) : ('') }
                                <div className="d-flex justify-content-between pt-4 ">
                                    <h6 className='text-black'>Grand Total</h6>
                                    <h6 className=' d-flex justify-content-end primary-text fw-bolder'>{grandTotal.toLocaleString("en-US",{style:"currency", currency:"USD"})}</h6>
                                </div>
                                <div className="">
                                    {/* <button className='secondary-btn w-100 mt-4'>Proceed to Checkout</button> */}
                                </div>
                            </div>
                        </div>
                        
                        <Checkout carts={carts} setCarts={setCarts} />
                        
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Cart;