
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
import { Buffer } from 'buffer';

const Profile = () => {
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName ] = useState('');
    const [email, setEmail ] = useState('');
    const [phone, setPhone ] = useState('');
    const [newPassword, setNewPassword ] = useState('');
    const [oldPassword, setOldPassword ] = useState('');
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
        }
    },[auth?.user]);
        
            // const loadAddress = async () => {
            //     try {
            //       const { data } = await axios.get("/address", { headers: { Authorization: auth?.token } });
            //       setAddress(data.address);
            //       setCity(data.city);
            //       setState(data.state);
            //       setCountry(data.country);
            //       setZipCode(data.zipCode);
            //     } catch (err) {
            //       console.log(err);
            //     }
            // };


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
                setPhoto('')
                navigate('/dashboard/user/profile');
            }
        }catch(error){
            toast.error("Profile Update Failed");
        }
    }
    const handlePassChange = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        if (!oldPassword) {
            toast.error("Please enter your old password");
            return;
          }
        try {
          const profileData = new FormData();
          profileData.append("oldPassword", oldPassword);
          profileData.append("newPassword", newPassword);
      
          const { data } = await axios.put("/password", profileData);
          if (data?.error) {
            toast.error(data.error);
          } else {
            toast.success("Password Updated");
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            navigate("/dashboard/user/profile");
          }
        } catch (error) {
          toast.error("Profile Update Failed");
        }
      };

      const photoData = auth?.user?.photo?.data || '';

    return (
        <div>
            <div className="container-fluid">
                <div className="row mx-4 my-5 ">
                    <div className=" d-flex d-flex justify-content-between">
                        <div className=" bg-light rounded shadow-sm" style={{width:"49%"}}>
                        <div className="mx-3">
                            <h3 className='py-4'>Personal Details</h3>
                            <div className="text-center">
                                <img
                                className="icon-nav-img-lg "
                                src={`data:${auth?.user?.photo?.contentType};base64,${Buffer.from(photoData).toString("base64")}`}
                                alt=""
                                style={{ width: "120px", height: "120px" , objectFit: 'cover' }}
                                />
                            </div>
                            {photo && (
                                <div className='text-center'>
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="Product Photo"
                                        className="img img-responsive rounded-circle "
                                        style={{ width: "120px", height: "120px" , objectFit: 'cover' }}
                                    />
                                        
                                </div>
                            )}
                            
                            {/* Otherwise Photo Upload */}
                            <div className=' pt-2 mx-2'>
                                <label className='form-control bg-light pointer w-100 mb-2 text-center'>

                                    {photo ? photo.name : "Upload photo"}
                                    
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e)=> setPhoto(e.target.files[0])}
                                        hidden
                                    ></input>
                                </label>
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
                            <label>Old Password</label>
                            <input
                                placeholder="Old Password"
                                className="form-control bg-light"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="p-2">
                            <label> New Password</label>
                            <input  
                                placeholder="New Password" 
                                className="form-control bg-light" 
                                type="password"
                                value={newPassword}
                                onChange={(e)=> setNewPassword(e.target.value)}
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