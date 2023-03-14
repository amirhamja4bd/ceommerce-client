
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import AdminMenu from '../../../components/nav/AdminMenu';
import FullscreenLoader from '../../../components/nav/FullscreenLoader';

const Products = () => {

    const [products, setProducts ] = useState([]);

    let loader = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        loadProducts();
    },[])

    const loadProducts = async () => {
        try{
            loader.classList.remove("d-none")
            const {data} = await axios.get('/products');
            setProducts(data);
            console.log(data);
            loader.classList.add("d-none")
        }
        catch(error){
            console.log(error);
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
            // loader.classList.remove("d-none")
            await axios.delete(`/product/${id}`);
            window.location.href="/dashboard/admin/products"
            loader.classList.add("d-none")
            return result;
        }
    };

    const handleDuplicate = async (id) => {
        loader.classList.remove("d-none")
        await axios.post(`/product/${id}`);
        window.location.href="/dashboard/admin/products"
        loader.classList.add("d-none")
    }

   

    return (
        <div>
            <div className='d-none' ref={(div)=>loader=div}>
                <FullscreenLoader/>
            </div>
            <div className="me-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <button onClick={()=>navigate("/dashboard/admin/product")} className=" my-4 main-btn my-4"><i class="fa-solid fa-plus"></i> New Product</button>
                        <div className="card">
                            <table class=" table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.map((p, i)=>(
                                        <tr className='align-middle'>
                                        <th scope="row">{i +1}</th>
                                        <td>
                                        <img
                                            src={`${process.env.REACT_APP_API}/product/photo/${p?._id}`}
                                            alt={p?.name}
                                            className="img img-fluid rounded"
                                            style={{ height: "40px", width:"40px", objectFit: "cover"}}
                                        />
                                        </td>
                                        <td> <p>{p?.title}</p></td>
                                        <td> Available: { p?.quantity} <p>Sold: {p?.sold}</p></td>
                                        <td>{p?.price}</td>
                                        {p?.status == "Draft" ? <td><p className='badge rounded-pill bg-danger '>{p?.status}</p></td> : <td><p className='badge rounded-pill bg-success'>{p?.status}</p></td> }
                                        <td>
                                            <div className="btn-group">
                                                <Link key={p._id} to={`/product/${p.slug}`}>
                                                    <button className='btn btn-sm btn-info  ms-1' style={{borderRadius:"50%"}}><i class="fa-solid fa-eye"></i></button>
                                                </Link>
                                                <Link key={p._id} to={`/dashboard/admin/product/update/${p.slug}`}>
                                                    <button className='btn btn-sm btn-primary  ms-1' style={{borderRadius:"50%"}}><i class="fa-solid fa-pen-to-square"></i></button>
                                                </Link>
                                                <button onClick={handleDuplicate.bind(this, p?._id)} className='btn btn-sm btn-warning ms-1' style={{borderRadius:"50%"}}><i class="fa-regular fa-copy"></i></button>
                                                <button onClick={handleDelete.bind(this, p?._id)} className='btn btn-sm btn-danger bg-opacity-25 ms-1' style={{borderRadius:"50%"}}><i class="fa-regular fa-trash-can"></i></button>
                                            </div>
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;