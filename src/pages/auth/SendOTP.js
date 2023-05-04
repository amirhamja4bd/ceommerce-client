import React, {Fragment, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-hot-toast';
import { IsEmail} from "../../helper/FormHHelper";
import { RecoverVerifyEmailRequest } from '../../Api/UserApi';
import FullscreenLoader from '../../components/nav/FullscreenLoader';

const SendOTP = () => {

    let emailRef=useRef();
    let loader = useRef();

    let navigate=useNavigate();

    const VerifyEmail=()=>{
        let email=emailRef.value;
        if(IsEmail(email)){
            toast.error("Valid Email Address Required !")
        }
        else{
            loader.classList.add("d-none")
            RecoverVerifyEmailRequest(email).then((result)=>{
            loader.classList.remove("d-none")
                if(result===true){
                    navigate("/verify-otp")
                }
            })
        }
    }

    return (
        <Fragment>
            <div className='d-none' ref={(div)=>loader=div}>
                <FullscreenLoader/>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen py-5">
                        <div className="rounded shadow w-100  p-4">
                            <div className="card-body">
                                <h4>EMAIL ADDRESS</h4>
                                <br/>
                                {/* <label>Your email address</label> */}
                                <input ref={(input)=>emailRef=input}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <button onClick={VerifyEmail}  className="secondary-btn w-100 animated fadeInUp ">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOTP;
