import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import FullscreenLoader from '../../../components/nav/FullscreenLoader';

const Category = () => {

    let loader = useRef();

    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState([]);

    console.log("photo Cat", photo)
    const navigate = useNavigate();


    useEffect(()=>{
        loadCategories();
    },[]);

    // category Load
    const loadCategories =async () =>{
        try{
            loader.classList.remove("d-none")
            const { data } = await axios.get('/categories');
            setCategory(data);
            loader.classList.add("d-none")
        }
        catch(error){
            console.log(error);
        }
    }

        // category Update
        const updateCategory = (slug)=>{
            navigate(`/dashboard/admin/category/update/${slug}`);
        }
        
    // category Submit
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const categoryData = new FormData();
            categoryData.append("photo", photo);
            categoryData.append("name", name);

            loader.classList.remove("d-none")
            const { data } = await axios.post('/category', categoryData);
            if(data?.error){
                console.log(data)
                toast.error(data.error);
            }
            else{
                toast.success(`'${data.name}' is created successfully`);
                setName("")
                loadCategories();
                loader.classList.add("d-none")
                
            }
        }
        catch(error){
            console.log(error);
            toast.error('Category create failed. try again later');
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
            await axios.delete(`/category/${id}`);
            window.location.href="/dashboard/admin/category"
            loader.classList.add("d-none")
            return result;
        }
    }

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
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category?.map((b, i)=>(
                                    <tr key={b?._id}>
                                        <th scope="row">{i +1}</th>
                                        <td>
                                        <img
                                            src={`${process.env.REACT_APP_API}/category/photo/${b?._id}`}
                                            alt={b?.name}
                                            className="img img-fluid rounded"
                                            style={{ height: "40px", width:"40px", objectFit: "cover"}}
                                        />
                                            </td>
                                        <td>{b?.name}</td>
                                        <td>
                                            <button  onClick={updateCategory.bind(this, b?.slug)} className='view-btn me-2'><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button  onClick={handleDelete.bind(this, b?._id)} className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                                            
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-5 mt-5 bg-light h-100 shadow-sm">
                            <div className="p-3 mt-2 mb-2 lead bg-light border-bottom">Create New Category</div>
                        
                            <div className=' mx-auto'>
                                {/*  Photo Show */}
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

                                    {/* Product Name */}
                                <div className="">
                                    <input
                                    type="text"
                                    className="form-control form-control-sm p-2 mb-3 col-md-6 bg-light"
                                    placeholder="Write a name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                </div>
                                
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

export default Category;