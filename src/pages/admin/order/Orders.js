import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import OrderCard from '../../../components/card/OrderCard';
import { Select } from 'antd';
import { toast } from 'react-hot-toast';
const { Option } = Select;
const Orders = () => {

    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([
        "pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ]);
      const [changedStatus, setChangedStatus] = useState("");

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    
    const navigate = useNavigate();


    const getOrders = async () => {
        try {
        const { data } = await axios.get("/orders");
        setOrders(data);
        } catch (err) {
        console.log(err);
        }
    };
    
    const handleChange = async (orderId, value) => {
        setChangedStatus(value);
        try {
          const { data } = await axios.put(`/order-status/${orderId}`, {
            status: value,
          });
          getOrders();
        } catch (err) {
          console.log(err);
        }
      };


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
                        {orders?.map((o, i) => {
                            
                            return (
                                <div
                                key={o._id}
                                className="border shadow-sm bg-light rounded-4 mb-5"
                                >
                                    
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Ordered</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    onChange={(value) => handleChange(o._id, value)}
                                                    defaultValue={o?.status}
                                                >
                                                    {status.map((s, i) => (
                                                    <Option key={i} value={s}>
                                                        {s}
                                                    </Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{auth.user.fullName}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length} products</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        <div className="row m-2">
                                            {o?.products?.map((p, i) => (
                                                <OrderCard  key={i} p={p} o={o} remove={true} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                         })} 
                    </div>
                </div>
            </div>
        </>
    );
};

export default Orders;