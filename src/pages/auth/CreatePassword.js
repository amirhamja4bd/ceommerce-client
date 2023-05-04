import React, {Fragment, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import { toast } from 'react-hot-toast';
import { getEmail, getOTP, IsEmpty } from '../../helper/FormHHelper';
import { RecoverResetPassRequest } from '../../Api/UserApi';

const CreatePassword = () => {

    let PasswordRef,ConfirmPasswordRef=useRef();
    let navigate=useNavigate();

    const ResetPassword = () => {
        let Password = PasswordRef.value;
        let ConfirmPassword =  ConfirmPasswordRef.value;
        if(IsEmpty(Password)){
            toast.error("Password Required")
        }
        else if(IsEmpty(ConfirmPassword)){
            toast.error("Confirm Password Required")
        }
        else if(Password!==ConfirmPassword){
            toast.error("Password & Confirm Password Should be Same")
        }
        else{
            RecoverResetPassRequest(getEmail(),getOTP(),Password).then((result)=>{
                if(result===true){
                    navigate("/login")
                }
            })
        }
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="rounded my-5 shadow w-100 p-4">
                            <div className="">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                {/* <label>Your email address</label> */}
                                <input readOnly={true} value={getEmail()} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                {/* <label>New Password</label> */}
                                <input  ref={(input)=>PasswordRef=input} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                {/* <label>Confirm Password</label> */}
                                <input  ref={(input)=>ConfirmPasswordRef=input} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={ResetPassword} className=" w-100 animated fadeInUp  secondary-btn">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;
