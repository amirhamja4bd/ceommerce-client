import { useAuth } from '../../context/AuthContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import location from '../../assets/img/location.svg'
import Lottie from "lottie-react";
import pass from '../../assets/img/pass.json'

const Address = () => {

    const [phone, setPhone ] = useState('');
    const [newPhone, setNewPhone ] = useState('');
    const [name, setName ] = useState('');
    const [fullName, setFullName ] = useState('');
    const [city, setCity ] = useState('');
    const [state, setState ] = useState('');
    const [country, setCountry ] = useState('');
    const [zipCode, setZipCode ] = useState('');
    const [addressData, setAddressData ] = useState('');

    const fullAddress = state +', ' + city +', ' + country +', ' + zipCode

    const [auth, setAuth ] = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (auth?.user){
            const { phone, fullName } = auth.user;
            setPhone(phone);
            setName(fullName);
        }
            loadAddress()
    },[auth?.user]);

    const loadAddress = async () => {
        try {
          const { data } = await axios.get("/address", { headers: { Authorization: auth?.token } });
          setAddressData(data);
          setCity(data["0"].city);
          setState(data["0"].state);
          setFullName(data["0"].fullName);
          setNewPhone(data["0"].phone);
          setCountry(data["0"].country);
          setZipCode(data["0"].zipCode);
        } catch (err) {
          console.log(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const addressData = { city, state, country, zipCode , fullName: fullName || name, phone: newPhone || phone };
          const {data} = await axios.post('/addresses', addressData);
            toast.success('Address Created');
            setCity('');
            setState('');
            setCountry('');
            setZipCode('');
            loadAddress()
        }
        catch (error) {
          console.error(error);
          toast.error('Address Create Failed');
        }
      };


    return (
        <div>
            <div className=" d-flex d-flex justify-content-between mx-4 pt-4 animated fadeInUp">
                {addressData.length > 0 ?(
                <div className=" bg-light rounded shadow-sm h-100 px-4" style={{width:"49%"}}>
                    <p className=' float-end pt-4'>
                    <Link  to={`/dashboard/user/address/${addressData[0]?._id}`}>
                        <button className='view-btn ms-2' style={{borderRadius:"50%"}}><i class="fa-solid fa-pen-to-square"></i></button>
                    </Link>
                        {/* <i class="fa-solid fa-pen-to-square"></i> */}
                        </p>
                    <h4 className='pt-3'>Shipping Address</h4>
                    <div className="pb-4">
                        <small>{fullName || name}</small><br />
                        <small>{newPhone || phone}</small><br />
                        <small>{fullAddress}</small>
                    </div>
                </div>
                ) : (
                <div className=" bg-light rounded shadow-sm px-4" style={{width:"49%"}}>
                    
                    <div className="">
                        <h3 className='pt-3'>Create Your Address</h3>
                        <div className=" p-2">
                            <label> Full Name</label>
                            <input  
                                value={ fullName || name}
                                placeholder="Enter Phone Number" 
                                className="form-control bg-light" 
                                onChange={(e)=> setFullName(e.target.value)}
                                type="text"
                                />
                        </div>
                        {/* <div className=" p-2">
                            <label>Address</label>
                            <input  
                                value={address}
                                placeholder="Enter Address" 
                                className="form-control bg-light" 
                                onChange={(e)=> setAddress(e.target.value)}
                                type="text"
                                />
                        </div> */}
                        <div className=" p-2">
                            <label>State</label>
                            <input 
                                value={state}
                                placeholder="Enter State" 
                                className="form-control bg-light" 
                                type="email"
                                onChange={(e)=> setState(e.target.value)}
                            />
                        </div>
                        <div className=" p-2">
                            <label>City</label>
                            <input  
                                value={city}
                                placeholder="Enter City" 
                                className="form-control bg-light" 
                                onChange={(e)=> setCity(e.target.value)}
                                type="text"
                                />
                        </div>
                        <div className=" p-2">
                            <label>Country</label>
                            <input 
                                value={country}
                                placeholder="Enter Country" 
                                className="form-control bg-light" 
                                type="email"
                                onChange={(e)=> setCountry(e.target.value)}
                            />
                            
                        </div>
                        <div className=" p-2">
                            <label>ZipCode</label>
                            <input 
                                value={zipCode}
                                placeholder="Enter Zip Code"  
                                className="form-control bg-light" 
                                type="email"
                                onChange={(e)=> setZipCode(e.target.value)}
                            />
                            
                        </div>
                        <div className=" p-2">
                            <label>Phone Number</label>
                            <input  
                                value={ newPhone || phone}
                                placeholder="Enter Phone Number" 
                                className="form-control bg-light" 
                                onChange={(e)=> setNewPhone(e.target.value)}
                                type="text"
                                />
                        </div>
                        <button onClick={handleCreate} className=" secondary-btn my-3 ms-2">Create</button>
                    </div>
                </div>
                )}
                <div className=" bg-light rounded shadow-sm d-flex align-items-center " style={{width:"49%", overflowX:"hidden"}}>
                    <div className="w-50  mx-auto d-block ">
                        <Lottie animationData={pass} loop={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Address;