
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import FullscreenLoader from '../../../components/nav/FullscreenLoader';
import ReactPaginate from "react-paginate";

const Products = () => {

    let loader = useRef();
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [sliderValue, setSliderValue] = useState({ min: 0, max: 1000 });
    const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 1000, bestSell: false, keyword: '', sort: '', perPage: 10 });
 
    useEffect(() => {
        loadCategories();
        loadBrands();
    }, []);

    useEffect(()=>{
        loadFilterProducts();
    },[filters, currentPage , totalPages , selectedCategories, selectedBrands])
   
    
    const loadFilterProducts = async () => {
        try {
            const postData = { ...filters, minPrice: sliderValue.min, maxPrice: sliderValue.max, keyword:filters.keyword, category: selectedCategories , brand: selectedBrands }
            const  {data}  = await axios.post(`/filter-products?page=${currentPage}&perPage=${filters.perPage}`, postData, );
            // console.log("data",data)
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.log(err);
        }
    };


    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const loadBrands = async () => {
        try {
            const { data } = await axios.get("/brands");
            setBrands(data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const handlePageClick = ({selected}) => {
        const selectedPage = selected + 1;
        setCurrentPage(selectedPage);
      };

    function handleSort(event) {
    const value = event.target.value;
    setFilters(prevFilters => ({ ...prevFilters, sort: value }));
    } 
    const handleKeywordChange = (event) => {
        const keyword = event.target.value;
        setFilters({ ...filters, keyword });
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
            <div className="ms-4 me-3">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={()=>navigate("/dashboard/admin/product")} className=" mt-0 main-btn my-3"><i class="fa-solid fa-plus"></i> New Product</button>
                        <div className=" d-flex mb-3 ">
                            <div>
                                <select id="sort-select" value={filters.sort} onChange={handleSort} className="form-control form-control-sm px-2" >
                                    <option value="" className="text-center ">-- Sort By --</option>
                                    <option value="price_asc" className="p-5">Price Low to High</option>
                                    <option value="price_desc" >Price High to Low</option>
                                    <option value="date_asc">Date Oldest to Newest</option>
                                    <option value="date_desc">Date Newest to Oldest</option>
                                    <option value="popular_product">Popular Products</option>
                                </select>
                            </div>
                            <div className="ms-3">
                            <select id="show-select" onChange={(e) => setFilters({ ...filters, perPage: parseInt(e.target.value) })} className="form-control form-control-sm px-2">
                                <option value="">Show Page<p><i class="arrow down"></i></p></option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            </div>
                            <div className=" px-3">
                               <form>
                                    <input
                                    type="text"
                                    style={{ borderRadius: "30px" }}
                                    className="form-control form-control-sm ps-3"
                                    placeholder="⌕ What you want...?"
                                    id="keyword"
                                    name="keyword"
                                    value={filters.keyword}
                                    onChange={handleKeywordChange}
                                    />
                                </form>
                            </div>
                            <div className="page px-2 d-flex align-items-center">
                                <small className="text-dark small primary-text" > {products?.length} Products </small>
                            </div>
                            <div className="page ms-auto px-2 d-flex align-items-center">
                                <small className="text-dark small " > Page {currentPage} of {totalPages} </small>
                            </div>
                        </div>
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
                                    <th scope="col" className=' d-flex justify-content-end pe-5'>Action</th>
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
                                            <div className="btn-group float-end me-2">
                                                <Link  to={`/product/${p?.slug}`}>
                                                    <button className=' view-btn  ms-2' style={{borderRadius:"50%"}}><i class="fa-solid fa-eye"></i></button>
                                                </Link>
                                                <Link  to={`/dashboard/admin/product/update/${p?.slug}`}>
                                                    <button className='edit-btn ms-2' style={{borderRadius:"50%"}}><i class="fa-solid fa-pen-to-square"></i></button>
                                                </Link>
                                                <button onClick={handleDuplicate.bind(this, p?._id)} className=' ms-2 copy-btn' style={{borderRadius:"50%"}}><i class="fa-regular fa-copy"></i></button>
                                                <button onClick={handleDelete.bind(this, p?._id)} className=' bg-opacity-25 ms-2 delete-btn' style={{borderRadius:"50%"}}><i class="fa-regular fa-trash-can"></i></button>
                                            </div>
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                                        
                        <div className="mb-4">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-center mt-5"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link rounded-circle me-2 "}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link rounded-circle me-2 "}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link rounded-circle me-2 "}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link rounded-circle me-2 "}
                            activeClassName={"active"}
                        />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;