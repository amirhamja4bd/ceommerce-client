import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import FullscreenLoader from '../../../components/nav/FullscreenLoader';
import { DatePicker, Select } from 'antd';
import { Option } from 'antd/es/mentions';

const CouponCreate = () => {

    const [status, setStatus] = useState("fixed");

    let loader = useRef();

    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState('');
    const [discAmount, setDiscAmount] = useState();
    const [minPurchase, setMinPurchase] = useState();
    const [limit, setLimit] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [coupons, setCoupons] = useState([]);

    console.log("Ccpn", code)
    console.log("Dcpn", discAmount)
    console.log("Mcpn", minPurchase)
    console.log("Lcpn", limit)
    console.log("Scpn", selectedDate)
    const navigate = useNavigate();


    useEffect(()=>{
        loadCoupons();
    },[]);

    // category Load
    const loadCoupons =async () =>{
        try{
            loader.classList.remove("d-none")
            const { data } = await axios.get('/coupons');
            setCoupons(data);
            loader.classList.add("d-none")
        }
        catch(error){
            console.log(error);
            loader.classList.add("d-none")
        }
    }

        // category Update
        const updateCoupon = (id)=>{
            navigate(`/dashboard/admin/coupon/update/${id}`);
        }
        
    // category Submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const couponData = { code, discountType: status , selectedDate , discountAmount: discAmount, minPurchase: minPurchase, usageLimit: limit , expirationDate: selectedDate };

            loader.classList.remove("d-none")
            const { data } = await axios.post('/coupon', couponData);
            if(data?.error){
                console.log(data)
                toast.error(data.error);
            }
            else{
                toast.success(`'${data.code}' is created successfully`);
                setCode("")
                setDiscAmount()
                setMinPurchase()
                setLimit()
                setCoupons([])
                setSelectedDate(null)
                loadCoupons();
                loader.classList.add("d-none")
                
            }
        }
        catch(error){
            console.log(error);
            toast.error('Coupon create failed. try again later');
            loader.classList.add("d-none")
        }
    };

    // Delete sweetalert2
    const handleDelete = async ( id ) =>{
        
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        
        if (result.isConfirmed) {
            await axios.delete(`/coupon/${id}`);
            loadCoupons()
            // window.location.href="/dashboard/admin/coupon"
            loader.classList.add("d-none")
            return result;
        }
    }

    const onChangeStart = (date, dateString) => {
        // console.log(date, dateString);
        setSelectedDate(date);
      };
      const handleStatusChange = (value) => {
        console.log("value, " , value);
        setStatus(value); 
      };

    return (
        <div>
            <div className='d-none' ref={(div)=>loader=div}>
                <FullscreenLoader/>
            </div>
            <div className="ms-4 me-3">
                <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-7 border card p-0 mt-5">
                            <table class="table ">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Min Purchase</th>
                                    <th scope="col">Discount Amount</th>
                                    <th scope="col">Limit</th>
                                    <th scope="col">Disc Type</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coupons?.map((c, i)=>(
                                    <tr key={c?._id}>
                                        <th scope="row">{i +1}</th>
                                        <td>{c?.code}</td>
                                        <td>{c?.minPurchase}</td>
                                        <td>{c?.discountAmount}</td>
                                        <td>{c?.usageLimit}</td>
                                        <td>{c?.discountType}</td>
                                        <td className='d-flex'>
                                            <button  onClick={updateCoupon.bind(this, c?._id)} className='view-btn me-2'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button  onClick={handleDelete.bind(this, c?._id)} className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                                            
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-4 mx-auto mt-5 bg-light h-100 shadow-sm">
                            <div className="p-3 mt-2 mb-2 lead bg-light border-bottom">Create New Coupon</div>
                        
                            <div className=' mx-auto'>
                                    {/* Product Name */}
                                <div className="">
                                    <input
                                    type="text"
                                    className="form-control form-control-sm p-2 mb-3 col-md-6 bg-light"
                                    placeholder="Write a Code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                </div>
                                <div className="">
                                <DatePicker
                                    showTime={{ format: 'hh:mm A', use12Hours: true }}
                                    onChange={onChangeStart}
                                    placeholder="Expiration date"
                                    className="form-control form-control-sm p- mb-3 col-md-6 bg-light"
                                />
                                </div>
                                <Select
                                    bordered={false}
                                    className="form-control form-control-sm p-0 mb-3 col-md-6 bg-light"
                                    defaultValue={status}
                                    onChange={handleStatusChange}
                                    >
                                        <Select.Option value="fixed">fixed</Select.Option>
                                        <Select.Option value="percentage">percentage</Select.Option>
                                </Select>
                                <div className="">
                                    <input
                                    type="number"
                                    className="form-control form-control-sm p-2 mb-3 col-md-6 bg-light"
                                    placeholder="Discount Amount"
                                    value={discAmount}
                                    onChange={(e) => setDiscAmount(e.target.value)}
                                />
                                </div>
                                <div className="">
                                    <input
                                    type="number"
                                    className="form-control form-control-sm p-2 mb-3 col-md-6 bg-light"
                                    placeholder="Min Purchase"
                                    value={minPurchase}
                                    onChange={(e) => setMinPurchase(e.target.value)}
                                />
                                </div>
                                <div className="">
                                    <input
                                    type="number"
                                    className="form-control form-control-sm p-2 mb-3 col-md-6 bg-light"
                                    placeholder="Usage Limit"
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                />
                                </div>
                                {/* <div className="">
                                    <input
                                    type="text"
                                    className="form-control form-control-sm p-2 mb-3 col-md-6 bg-light"
                                    placeholder="Applicable Products"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                </div> */}
                                
                                {/* Submit */}
                                <button onClick={handleSubmit} className="secondary-btn w-100 mb-5 ">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        </div>
    );
};

export default CouponCreate;