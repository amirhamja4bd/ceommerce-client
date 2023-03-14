import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './cart.css'

const WishList = () => {

    const[carts, setCarts] = useState([]);
    const [auth, setAuth ] = useAuth();
    const[wishList, setWishList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadWishList();
    }, []);

    const loadWishList = async () => {
        try {
          const token = localStorage.getItem('token'); // get the token from local storage
          const { data } = await axios.get("/wishlists", { headers: { Authorization: token } });
          setWishList(data.wishlist);
        } catch (err) {
          console.log(err);
        }
    };

    const addToCart = async (items) => {
        try {
          const {data} = await axios.post('/cart', { productId: items?._id, quantity:1 });
          const productId = items?._id
          const itemIndex = data.items.findIndex(item => item.product === productId);
          if (itemIndex !== -1) {
            const countQuantity = data.items[itemIndex].quantity;
            toast.success(`${countQuantity} Item Add to Cart Successfully`);
          }
        }
        catch (error) {
          console.error(error);
          toast.error('Could not add item to cart');
        }
      };
      
    
    const handleDelete = async (items) => {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`/wishlist/${items?.product?._id}`, {
            headers: { Authorization: token },
          });
          const updatedWishList = wishList.filter((item) => item._id !== items?.product?._id);
          setWishList(updatedWishList);
          toast.success('Item deleted successfully');
        } catch (error) {
          console.error(error);
          toast.error('Could not delete item from wishlist');
        }
      };
    

    return (
        <div className=' overflow-hidden'>
            <div className="my-4 bg-light py-2 text-center ">
                {wishList.length ? ( <h4>Hey, {auth?.user?.fullName} You have {wishList.length} Items Add to Wish List</h4>) : (
                    <div className="text-center">
                        <button 
                            onClick={()=> navigate("/")}
                            className='secondary-btn'>Continue Shopping</button>
                    </div>
                )}
            </div>
            {wishList.length > 0 && (
            <div class="container-fluid mx-5">
                <div className="row">
                    <div className=" border col-md-9">
                        <div className="row">
                        <table class=" table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col"></th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishList?.map((items , i)=>(
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
                                    <td>{items?.product?.price.toLocaleString("en-US",{style:"currency", currency:"USD"})} </td>  
                                    <td>
                                        <div className="btn-group">
                                            <button key={items?.product?._id}  onClick={addToCart.bind(this, items?.product)} className='primary-bg btn bg-opacity-25 p-2 text-white ' style={{borderRadius:"50%", height:"40px", width:"40px"}}><i class="fa fa-shopping-cart"></i></button>
                                            <button key={items?.product?._id}  onClick={handleDelete.bind(this, items)} className='btn-danger btn bg-opacity-25 ms-1' style={{borderRadius:"50%"}}><i class="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    {/* <div className="col-md-3">
                        <div className="">
                            <h4>Sub Total: {carts?.total.toLocaleString("en-US",{style:"currency", currency:"USD"})}</h4>
                        </div>
                        
                    </div> */}
                </div>
            </div>
            )}
        </div>
    );
};

export default WishList;