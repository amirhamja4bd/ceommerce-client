import React, {Fragment, useRef, useState} from 'react';
import { IsEmail} from "../../helper/FormHHelper";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-hot-toast';
import axios from 'axios';

const SendOTP = () => {

    let navigate=useNavigate();

    const [email, setEmail ] = useState()

    const VerifyEmail=async () => {
        if (IsEmail(email)) {
            toast.error("Valid Email Address Required !")
        } else {
            let {data} = await axios.get(`/recover-verify-email/${email}`)
            console.log("-------", data)
            if (data.data) {
                navigate("/verify-otp")
                localStorage.setItem("email", JSON.stringify(email));
            }
        }
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card shadow w-90">
                            <div className="card-body text-start">
                                <h4>EMAIL ADDRESS</h4>
                                <hr/>
                                <label>Your email address</label>
                                <input onChange={(e)=> setEmail(e.target.value)}  placeholder="User Email" className="form-control" type="email"/>
                                <br/>
                                <button onClick={VerifyEmail} className="secondary-btn w-100 ">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SendOTP;