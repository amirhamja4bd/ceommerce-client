import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [firstName, setFirstName ] = useState('a');
    const [lastName, setLastName ] = useState('s');
    const [email, setEmail ] = useState('a@gmail.com');
    const [phone, setPhone ] = useState('01756986529');
    const [password, setPassword ] = useState('11111111');
    
    let photo = 'https://i.ibb.co/4pDNDk1/avatar.png';

    const navigate = useNavigate();

    const handleRegister = async (e) =>{
        e.preventDefault();
        try{
             const { data } = await axios.post('/register', {firstName, lastName, email, phone, password , photo });
             if(data?.error){
                toast.error( data.error);
             }
             else{
                toast.success('Registration Success')
                navigate('/login');
             }
        }catch(error){
            toast.error("Registration Failed");
        }
    }
    return (
        <div>
            <div class="container my-5 ">
                <div class="row justify-content-center">
                    <div class=" card border-0 shadow col-lg-4 p-4 mb-5">
                        <h1 class="mb-3 text-center">SIGN UP</h1>
                        <form onSubmit={handleRegister}>
                            <div class="row g-3">
                            <div class="col-md-12">
                                <input value={firstName} onChange={(e)=> setFirstName(e.target.value)} type="text" class="form-control " id="your-name" placeholder='First Name' required />
                            </div>
                            <div class="col-md-12">
                                <input value={lastName} onChange={(e)=> setLastName(e.target.value)} type="text" class="form-control " id="your-surname" placeholder='Last Name' required />
                            </div>
                            <div class="col-md-12">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control " id="your-email" placeholder='Email' required />
                            </div>
                            <div class="col-md-12">
                                <input value={phone} onChange={(e)=> setPhone(e.target.value)} type="text" class="form-control " id="your-subject" placeholder='Phone'/>
                            </div>
                            <div class="col-md-12">
                                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" class="form-control " id="your-subject" placeholder='Password'/>
                            </div>
                            <div class="col-12">
                                <div class="row">
                                <div class="col-md-12">
                                    <button data-res="" type="submit" class="secondary-btn w-100 fw-bold" >Send</button>
                                </div>
                                </div>
                            </div>
                            <small className=''> Already you have account? <a className='text-success' href="/login">Sign in</a> </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;