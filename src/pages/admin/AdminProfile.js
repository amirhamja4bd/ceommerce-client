import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import FullscreenLoader from '../../components/nav/FullscreenLoader';
import { useAuth } from '../../context/AuthContext';
import Lottie from "lottie-react";
import pass from '../../assets/img/pass.json'

const AdminProfile = () => {

    let loader = useRef();
    
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName ] = useState('');
    const [email, setEmail ] = useState('');
    const [phone, setPhone ] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress ] = useState('');
    const [photo, setPhoto ] = useState('');

    const [auth, setAuth ] = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (auth?.user){
            const {firstName, lastName, email, phone, password, address, photo } = auth.user;
            setFirstName(firstName);
            setLastName(lastName);
            setPhone(phone);
            setEmail(email);
            setAddress(address);
            setPhoto(photo);
        }
    },[auth?.user]);

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
            

            loader.classList.remove("d-none")
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
                navigate('/dashboard/admin/profile');
                loader.classList.add("d-none")
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
            navigate("/dashboard/admin/profile");
          }
        } catch (error) {
          toast.error("Profile Update Failed");
        }
      };

    return (
        <div>
            <div className='d-none' ref={(div)=>loader=div}>
                <FullscreenLoader/>
            </div>
            {/* <div className=" ms-4 me-3" style={{zIndex:"100"}}>
                <div className="row">
                    <div className=" col-md-12">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Profile</div>
                        <div className="row d-flex justify-content-center mt-3">
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="container-fluid">
                                            <img className="icon-nav-img-lg " src={auth?.user?.photo} alt={auth?.user?.fullName}/>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-4 p-2">
                                                    <label>Profile Picture</label>
                                                    <input onChange={(e) => setPhoto(e.target.files[0])}  placeholder="User Email" className="form-control" type="file"/>
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>First Name</label>
                                                    <input  
                                                        value={firstName}
                                                        placeholder="Enter your Name" 
                                                        className="form-control" 
                                                        onChange={(e)=> setFirstName(e.target.value)}
                                                        type="text"
                                                        />
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Last Name</label>
                                                    <input  
                                                        value={lastName}
                                                        placeholder="Enter your Name" 
                                                        className="form-control" 
                                                        onChange={(e)=> setLastName(e.target.value)}
                                                        type="text"
                                                        />
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Phone Number</label>
                                                    <input  
                                                        value={phone}
                                                        placeholder="Enter your Name" 
                                                        className="form-control" 
                                                        onChange={(e)=> setPhone(e.target.value)}
                                                        type="text"
                                                        />
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Email Address</label>
                                                    <input 
                                                        value={email} key={Date.now()}   
                                                        readOnly={true} 
                                                        placeholder="User Email" 
                                                        className="form-control" 
                                                        type="email"
                                                        onChange={(e)=> setEmail(e.target.value)}
                                                    />
                                                    
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Password</label>
                                                    <input  
                                                        placeholder="User Password" 
                                                        className="form-control" 
                                                        type="password"
                                                        value={password}
                                                        onChange={(e)=> setPassword(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-4 p-2">
                                                    <label>Address</label>
                                                    <textarea 
                                                        placeholder="Type Your Address" 
                                                        className="form-control" type="text" 
                                                        value={address}
                                                        onChange={(e)=> setAddress(e.target.value)}
                                                        style={{height:"20px" , maxHeight:"100px"}}/>
                                                </div>
                                            </div>
                                                
                                                <button onClick={handleUpdate} className=" col-md-4 secondary-btn mt-2">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="row mx-2 my-5 d-flex justify-content-between mx-4">
                <div className=" bg-light rounded shadow-sm" style={{width:"49%"}}>
                    <div className="">
                        <h3 className='py-4'>Personal Details</h3>
                        <div className="text-center">
                            <img className="icon-nav-img-lg" src={auth?.user?.photo} alt={auth?.user?.fullName}/>
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
                <div className=" bg-light rounded shadow-sm" style={{width:"49%"}}>
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
    );
};

export default AdminProfile;