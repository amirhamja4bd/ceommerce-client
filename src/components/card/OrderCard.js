import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const OrderCard = ({i, o, p , remove = true}) => {

    // console.log('OrderCard', p)
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const navigate = useNavigate();


    const getOrders = async () => {
        try {const token = localStorage.getItem('token');
        const { data } = await axios.get("/orders" , { headers: { Authorization: token } });
        setOrders(data);
        } catch (err) {
        console.log(err);
        }
    };
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/orders/${o?._id}`, { headers: { Authorization: token } });
            toast.success("Delete Success");
            getOrders();
        } catch (err) {
            toast.error("Delete Failed");
            console.log(err);
        }
    };

    const a=()=>{

    }
    return (
        <>
        <table>
        <thead className=''>
            <tr>
                <th scope="col">No</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col"  className=''>Quantity</th>
                {remove &&
                <th scope="col">Action</th>
                }
            </tr>
        </thead>
        <tbody>               
            <tr className='align-middle'>
                <th scope="row">{i+1}</th>
                <td className='d-flex align-items-center'>
                <img
                    src={`${process.env.REACT_APP_API}/product/photo/${p?.product?._id}`}
                    alt={""}
                    className="img img-fluid rounded my-2"
                    style={{ height: "90px", width:"90px", objectFit: "cover"}}
                />
                <td className='pb-0 ms-3'> <p>{p?.product?.title}</p></td>
                </td>
                <td>{o?.total.toLocaleString("en-US",{style:"currency", currency:"USD"})} </td>
                <td className='px-4'>{o?.products?.length} </td>
                {remove && (
                <td>
                    <div className="btn-group">
                        <button key={o?._id}  onClick={handleDelete.bind(this, o._id)} className='btn btn-sm btn-danger bg-opacity-25 ms-1' style={{borderRadius:"50%"}}><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
                )}
            </tr>
        </tbody>
        </table>
        </>
    );
};

export default OrderCard;
