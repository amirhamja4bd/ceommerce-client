import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DropIn from 'braintree-web-drop-in-react';
import {  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

const Checkout = () => {
    const [auth, setAuth ] = useAuth();
    const[carts, setCarts] = useState([]);
    const navigate = useNavigate();

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [address, setAddress ] = useState('');
    
    const shippingFee = 20

    useEffect(() => {
        if(auth?.token){
            getClientToken();
            loadAddress();
            loadCarts();
        }
    },[auth?.token]);

    const loadCarts = async () => {
        try {
          const token = localStorage.getItem('token'); // get the token from local storage
          const { data } = await axios.get("/carts", { headers: { Authorization: token } });
          setCarts(data);
        } catch (err) {
          console.log(err);
        }
    };

    // Client Payment Token
    const getClientToken = async () => {
        try {
          const { data } = await axios.get("/braintree/token");
        //   console.log("clToken",data.clientToken)
          setClientToken(data.clientToken);
        } catch (err) {
          console.log(err);
        }
    };

     // Handle Buy
     const handleBuy = async () => {
        try {
          setLoading(true);
          const { nonce } = await instance.requestPaymentMethod();
          
          const { data } = await axios.post("/checkout", { nonce, carts , shippingFee , address, tax:0 });
          
          setLoading(false);
          setCarts([]);
          navigate("/dashboard/user/orders");
          toast.success("Payment successful");
        } catch (err) {
          console.log(err);
          toast.error("Payment Failed");
          setLoading(false);
        }
      };

      const loadAddress = async () => {
        try {
          const { data } = await axios.get("/address", { headers: { Authorization: auth?.token } });
          const fullAddress = data[0].state + ', ' + data[0].city + ', ' + data[0].country + ', ' + data[0].zipCode
          // console.log("datsa",fullAddress)
          setAddress(fullAddress);
        } catch (err) {
          console.log(err);
        }
      };


    return (
        <div className=" mx-3 my-4 bg-light shadow-sm p-3">
            {address ? (
                <>
                    <div className="mb-3">
                        <h5>Address</h5>
                        <small>{address}</small>
                    </div>
                    <button onClick={()=> navigate("/dashboard/user/address")} className='btn btn-outline-primary btn-sm'>Update Address</button>
                </>
            ) : (
                <div className="mb-3">
                    {auth?.token ? (
                        <button onClick={()=> navigate("/dashboard/user/address")} className="btn btn-outline-dark btn-sm mt-2"> Add Delivery Address </button>
                    ) : (
                        <button onClick={()=> navigate("/login", {state: "/cart",})} className='btn btn-outline-danger btn-sm' >Login to Checkout</button>
                    )}
                </div>
            )}
            <div className="mt-3">
                {!clientToken || !carts?.items?.length ? ( "" ) : (
                    <>
                        <DropIn
                            options={{
                                authorization: clientToken,
                                paypal: { flow: 'vault'}
                            }}
                            onInstance={(instance)=>{ setInstance(instance)}}
                        />
                        <button
                            onClick={handleBuy}
                            className="secondary-btn  col-12 mt-2"
                            disabled={!address || !instance || loading}
                        >
                            {loading ? "Processing..." : "Buy"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Checkout;