import React from 'react';
import Lottie from "lottie-react";
import shopping from '../../assets/img/comming.json'
import Dashboard from '../../components/dashboard/AdminDashboard';

const AdminDashboard = () => {
    return (
        <div>
            <Dashboard/>
            {/* <div className="col-md-12d-flex justify-content-center px-5">
                <Lottie animationData={shopping} loop={true} style={{width: '800px' }} />
            </div> */}
        </div>
    );
};

export default AdminDashboard;