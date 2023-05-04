import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import FullscreenLoader from '../../../components/nav/FullscreenLoader';


const BrandUpdate = () => {

    let loader = useRef();

    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();

    const params = useParams();


    useEffect(()=>{
        loadBrands();
    },[]);

    // Brand Load
    const loadBrands =async () =>{
        try{
            loader.classList.remove("d-none")
            const  {data}  = await axios.get(`/brand/${params.slug}`);
            setName(data.name);
            setId(data._id);
            loader.classList.add("d-none")
        }
        catch(error){
            console.log(error);
        }
    }

    //Brand Submit
    const handleUpdate = async (e) =>{
        e.preventDefault();
        try{
            const brandData = new FormData();
            brandData.append("photo", photo);
            brandData.append("name", name);

            loader.classList.remove("d-none")
            const { data } = await axios.put(`/brand/${id}`, brandData);
            if(data?.error){
                console.log(data)
                toast.error(data.error);
            }
            else{
                toast.success(`'${data.name}' is Update successfully`);
                navigate('/dashboard/admin/brand');
                loadBrands();
                loader.classList.add("d-none")
                
            }
        }
        catch(error){
            console.log(error);
            toast.error('Brand create failed. try again later');

        }
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
                        <div className="col-md-5 mt-4">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Update Brand</div>
                    
                        <div className=' mx-auto'>
                            {/* If Photo then Photo Show */}
                            {photo && (
                                <div className='text-center'>
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="Product Photo"
                                        className="img img-responsive rounded "
                                        height="150px"
                                    />
                                        
                                </div>
                            )}
                            
                            {/* Otherwise Photo Upload */}
                            <div className=' pt-2'>
                                <label className='secondary-btn w-100 mb-3 text-center'>

                                    {photo ? photo.name : "Upload photo"}
                                    
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e)=> setPhoto(e.target.files[0])}
                                        hidden
                                    ></input>
                                </label>
                            </div>

                                {/* Brand Name */}
                            <div className="">
                                <input
                                type="text"
                                className="form-control form-control-sm p-2 mb-3 col-md-6"
                                placeholder="Write a name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                            
                            <button onClick={handleUpdate} className="secondary-btn w-100 mb-5 ">
                                Update
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

export default BrandUpdate;