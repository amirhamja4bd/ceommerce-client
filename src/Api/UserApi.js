import axios from "axios";
import { toast } from "react-hot-toast";
import { setEmail, setOTP } from "../helper/FormHHelper";

// Password Recovery verify email
export function RecoverVerifyEmailRequest(email){
    let URL="/recover-verify-email/"+email;
    return axios.get(URL).then((res)=>{
        if(res.status===200){
            if(res.data['status']==="fail"){
                toast.error("No user found");
                return false;
            }
            else{
                setEmail(email)
                toast.success("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            toast.error("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{
        toast.error("Something Went Wrong")
        return false;
    });
}

// verify otp
export function RecoverVerifyOTPRequest(email,otp){
    let URL="/recover-verify-otp/"+email+"/"+otp;
    return axios.get(URL).then((res)=>{
        if(res.status===200){
            if(res.data['status']==="fail"){
                toast.error(res.data['data']);
                return false;
            }
            else{
                setOTP(otp)
                toast.success("Code Verification Success");
                return true;
            }
        }
        else{
            toast.error("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        toast.error("Invalid OTP Code")
        return false;
    });
}

// Reset Password
export function RecoverResetPassRequest(email,otp,password){
    let URL="/recover-reset-password";
    let PostBody={email:email,otp:otp,password:password}
    return axios.post(URL,PostBody).then((res)=>{
        if(res.status===200){
            if(res.data['status']==="fail"){
                toast.error(res.data['data']);
                return false;
            }
            else{
                setOTP(otp)
                toast.success("New Password Created");
                return true;
            }
        }
        else{
            toast.error("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        toast.error("Something Went Wrong")
        return false;
    });
}