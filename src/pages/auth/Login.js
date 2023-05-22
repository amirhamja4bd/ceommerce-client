import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [auth, setAuth ,token, setToken] = useAuth();
    const [email, setEmail ] = useState('admin@gmail.com');
    const [password, setPassword ] = useState('11111111');

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axios.post('/login', { email, password,})
            if(data?.error){
                toast.error(data.error)
            }
            else{
                localStorage.setItem("auth", JSON.stringify(data));
                localStorage.setItem("token", data.token);
                setAuth({ ...auth, user: data.user, token: data.token });
                setToken(data.token )
                toast.success(" Login Successful")
                navigate( location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`);
            }
        }
        catch(error){
            toast.error(" Login Failed. Try again.")
        }
    }
    return (
        <div>
            <div class="container my-5 ">
                <div class="row justify-content-center">
                    <div class=" card border-0 shadow col-lg-4 p-4">
                        <h1 class="mb-3 text-center">SIGN IN</h1>
                        <form onSubmit={handleLogin}>
                            <div class="row g-3">
                            <div class="col-md-12">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control " id="your-email" name="your-email" placeholder='Email Address' required />
                            </div>
                            <div class="col-md-12">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control " id="your-subject" name="your-subject" placeholder='Password'/>
                            </div>
                            <small className=''> You Forgot Password? <a className='text-success' href="/send-otp">Reset</a> </small>
                            <div class="col-12">
                                <div class="row">
                                <div class="col-md-12">
                                    <button data-res="" type="submit" class="secondary-btn  w-100 fw-bold" >Login</button>
                                </div>
                                </div>
                            </div>
                            <small> Don’t have account? <a className='text-success' href="register">Sign up</a> </small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;