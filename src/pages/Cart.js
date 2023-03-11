import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {

    const[carts, setCarts] = useState([]);
    const [auth, setAuth ] = useAuth()

    const navigate = useNavigate();

    useEffect(() => {
        loadCarts();
    }, []);

    const loadCarts = async (req, res) => {
        try {
          const { data } = await axios.get("/carts");
          setCarts(data);
          console.log("CART",data);
        } catch (err) {
          console.log(err);
        }
    };
    

    // const loadCarts = async (req, res) => {
    //     try {
    //       const { data } = await axios.get("/carts" ,{  headers: { Authorization: auth?.token }, });
    //       setCarts(data);
    //       console.log("CART",data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    // };

    const handleDelete = async (items)=>{
        try {
        await axios.delete('/cart', { itemId: items._id});
        toast.success(" Delete cart successfully")
        }
        catch (error) {
        toast.error(error)
        console.error(error);
        }
    }
    

    return (
        <div className=' overflow-hidden'>
            <div className="my-4 bg-light py-2 text-center ">
                {carts?.items?.length ? ( <h4>Hey, {auth?.user?.fullName} You have {carts?.items?.length} Items Add to Cart</h4>) : (
                    <div className="text-center">
                        <button 
                            onClick={()=> navigate("/")}
                            className='secondary-btn'>Continue Shopping</button>
                    </div>
                )}
            </div>
            {carts?.items?.length > 0 && (
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
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts?.items?.map((items)=>(
                                <tr className='align-middle'>
                                    <th scope="row"></th>
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
                                    <td>{items?.quantity} </td>
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
                    <div className="col-md-3">
                        <div className="">
                            <h4>Sub Total: {carts?.total.toLocaleString("en-US",{style:"currency", currency:"USD"})}</h4>
                        </div>
                        
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Cart;