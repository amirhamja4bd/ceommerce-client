let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;


class FormHelper {

    IsEmpty(value) {
        return value.length === 0;
    }

    IsMobile(value){
        return MobileRegx.test(value);
    }

    IsEmail(value) {
        return !EmailRegx.test(value);
    }
    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }
    setEmail(email){
        localStorage.setItem("email",email)
    }
    getEmail(){
        return localStorage.getItem("email")
    }
}

export const {
    IsEmpty,
    IsMobile,
    setOTP,
    getOTP,
    IsEmail,
    setEmail,
    getEmail
} = new FormHelper();