
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Lottie from "lottie-react";
import pass from '../../assets/img/pass.json'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserAddress from './Address';
import axios from 'axios';

const Profile = () => {
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName ] = useState('');
    const [email, setEmail ] = useState('');
    const [phone, setPhone ] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [photo, setPhoto ] = useState('');

    const [address, setAddress ] = useState('');
    const [city, setCity ] = useState('');
    const [state, setState ] = useState('');
    const [country, setCountry ] = useState('');
    const [zipCode, setZipCode ] = useState('');

    const [auth, setAuth ] = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (auth?.user){
            const {firstName, lastName, email, phone, address, photo } = auth.user;
            setFirstName(firstName);
            setLastName(lastName);
            setPhone(phone);
            setEmail(email);
            setAddress(address);
            setPhoto(photo);
        }
            loadAddress()
    },[auth?.user]);
        
            const loadAddress = async () => {
                try {
                  const { data } = await axios.get("/address", { headers: { Authorization: auth?.token } });
                  setAddress(data.address);
                  setCity(data.city);
                  setState(data.state);
                  setCountry(data.country);
                  setZipCode(data.zipCode);
                } catch (err) {
                  console.log(err);
                }
            };


    const handleUpdate = async (e) =>{
        e.preventDefault();
        try{
            const profileData = new FormData();
            photo && profileData.append("photo", photo);
            profileData.append("firstName", firstName);
            profileData.append("lastName", lastName);
            profileData.append("email", email);
            profileData.append("phone", phone);
            profileData.append("address", address);

            const { data } = await axios.put('/profile', profileData );
            if(data?.error){
            toast.error( data.error);
            }
            else{
                setAuth({ ...auth, user: data});
                let lStorage = localStorage.getItem('auth');
                lStorage = JSON.parse(lStorage);
                lStorage.user = data;
                localStorage.setItem('auth', JSON.stringify(lStorage));
                toast.success("Profile Updated")
                navigate('/dashboard/user/profile');
            }
        }catch(error){
            toast.error("Profile Update Failed");
        }
    }
    const handlePassChange = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        try {
          const profileData = new FormData();
          profileData.append("password", password);
      
          const { data } = await axios.put("/password", profileData);
          if (data?.error) {
            toast.error(data.error);
          } else {
            toast.success("Password Updated");
            setPassword('');
            setConfirmPassword('');
            navigate("/dashboard/user/profile");
          }
        } catch (error) {
          toast.error("Profile Update Failed");
        }
      };

    return (
        <div>
            <div className="container-fluid">
                <div className="row mx-4 my-5 ">
                    <div className=" d-flex d-flex justify-content-between">
                        <div className=" bg-light rounded shadow-sm" style={{width:"49%"}}>
                        <div className="mx-3">
                            <h3 className='py-4'>Personal Details</h3>
                            <div className="text-center">
                                <img className="icon-nav-img-lg" src={auth?.user?.photo} alt={auth?.user?.fullName}/>
                                {/* {photo && (
                                        <div className='text-center'>
                                            <img 
                                                src={URL.createObjectURL(photo)} 
                                                alt="Product Photo"
                                                className="img img-responsive rounded "
                                                height="150px"
                                            />
                                                
                                        </div>
                                    )} */}
                                    
                                    {/* Photo Upload */}
                                    {/* <div className='pt-2'>
                                        <label className='secondary-btn text-center col-12 mb-3'>

                                            {photo ? photo.name : "Upload photo"}
                                            
                                            <input
                                                type="file"
                                                name="photo"
                                                accept="image/*"
                                                onChange={(e)=> setPhoto(e.target.files[0])}
                                                hidden
                                            ></input>
                                        </label>
                                    </div> */}
                            </div>
                            <div className=" p-2">
                                <label>Profile Picture</label>
                                <input onChange={(e) => setPhoto(e.target.files[0])}  placeholder="User Email" className="form-control bg-light" type="file"/>
                            </div>
                            <div className=" p-2">
                                <label>First Name</label>
                                <input  
                                    value={firstName}
                                    placeholder="Enter your Name" 
                                    className="form-control bg-light" 
                                    onChange={(e)=> setFirstName(e.target.value)}
                                    type="text"
                                    />
                            </div>
                            <div className=" p-2">
                                <label>Last Name</label>
                                <input  
                                    value={lastName}
                                    placeholder="Enter your Name" 
                                    className="form-control bg-light" 
                                    onChange={(e)=> setLastName(e.target.value)}
                                    type="text"
                                    />
                            </div>
                            <div className=" p-2">
                                <label>Phone Number</label>
                                <input  
                                    value={phone}
                                    placeholder="Enter your Name" 
                                    className="form-control bg-light" 
                                    onChange={(e)=> setPhone(e.target.value)}
                                    type="text"
                                    />
                            </div>
                            <div className=" p-2">
                                <label>Email Address</label>
                                <input 
                                    value={email} key={Date.now()}   
                                    readOnly={true} 
                                    placeholder="User Email" 
                                    className="form-control bg-light" 
                                    type="email"
                                    onChange={(e)=> setEmail(e.target.value)}
                                />
                                
                            </div>
                            <button onClick={handleUpdate} className=" secondary-btn my-3 ms-2">Update</button>
                        </div>
                    </div>
                    <div className=" bg-light rounded shadow-sm mx-3 px-3 " style={{width:"49%"}}>
                    <h3 className='py-4'>Change your password</h3>
                    <div className="w-50  mx-auto d-block">
                        <Lottie animationData={pass} loop={true} />
                    </div>
                    <div className="p-2">
                            <label>Password</label>
                            <input  
                                placeholder="Password" 
                                className="form-control bg-light" 
                                type="password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <div className="p-2">
                            <label>Confirm Password</label>
                            <input  
                                placeholder="Confirm Password" 
                                className="form-control bg-light" 
                                type="password"
                                value={confirmPassword}
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handlePassChange} className="  secondary-btn my-3 ms-2 ">Set Password</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;