import React from 'react';
import image from '../../assets/img/Ripple.svg'

const Loading = () => {
    return (
        <div>
            <div className="loading-top">
            </div>
            <div className="col-3 loading-left"></div>
            <div className="loading ">
                
                <img className='col-9 ' src={image} alt="" style={{height:"300px", width:"300px", marginTop:"0" }}/>
            </div>
        </div>
    );
};

// export default Loading;

// let loader = useRef();
// loader.classList.remove("d-none")
// loader.classList.add("d-none")

// <div className='d-none' ref={(div)=>loader=div}>
//     <Loading/>
// </div>