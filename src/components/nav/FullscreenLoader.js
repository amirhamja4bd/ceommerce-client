import React, { Fragment } from 'react';
import '../../assets/css/progress.css';

const FullscreenLoader = () => {

    return (
        <Fragment>
            <div className="LoadingOverlay">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default FullscreenLoader;


// export default Loading;

// let loader = useRef();
// loader.classList.remove("d-none")
// loader.classList.add("d-none")

// <div className='d-none' ref={(div)=>loader=div}>
//     <FullscreenLoader/>
// </div>