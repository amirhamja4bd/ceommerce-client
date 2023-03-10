import React, {Fragment, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { getEmail } from '../../helper/FormHHelper';
import { toast } from 'react-hot-toast';

const VerifyOTP = () => {

    let navigate=useNavigate();

    let  defaultInputStyle= {
            fontFamily: "monospace",
            MozAppearance: "textfield",
            margin: "4px",
            paddingLeft: "8px",
            width: "45px",
            borderRadius: '3px',
            height: "45px",
            fontSize: "32px",
            border: '1px solid lightskyblue',
            boxSizing: "border-box",
            color: "black",
            backgroundColor: "white",
            borderColor: "lightgrey"
        }

    let [otp,setOTP]=useState("")

    const email = localStorage.getItem("email")

    const SubmitOTP = async () => {
        if (otp.length === 6) {
            let result = await axios.get(`/recover-verify-otp/${email}/ `+otp )
            if (result === true) {
                navigate("/create-password")
            }
        } else {
            toast.error("Enter 6 Digit Code")
        }
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90">
                            <div className="card-body">
                                <h4>Otp VERIFICATION </h4>
                                <p>A 6 Digit verification code has been sent to your email address. </p>
                                <ReactCodeInput onChange={(e)=> setOTP(e.target.value)} inputStyle={defaultInputStyle}  fields={6}/>
                                <br/>  <br/>
                                <button onClick={SubmitOTP} className="secondary-btn w-100 ">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default VerifyOTP;