import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate ,useParams} from 'react-router-dom';
import AdminMenu from '../../../components/nav/AdminMenu';
import FullscreenLoader from '../../../components/nav/FullscreenLoader';

const Product = () => {

    let loader = useRef();

    useEffect(()=>{
        loadCategories();
        loadBrands();
    },[]);

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState("");
    const [brands, setBrands] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    const params = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        loadBrands();
        loadCategories();
        loadProducts();
    },[])
    
    // Category Load
    const loadCategories =async () =>{
        try{
            const { data } = await axios.get('/categories');
            setCategories(data);
        }
        catch(error){
            console.log(error);
        }
    }

    // Category Load
    const loadBrands =async () =>{
        try{
            const  {data}  = await axios.get('/brands');
            setBrands(data);
        }
        catch(error){
            console.log(error);
        }
    }
    const loadProducts = async () => {
        try{
            loader.classList.remove("d-none")
            const {data} = await axios.get(`/product/${params.slug}`);
            setTitle(data.title);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category[0]._id);
            setBrand(data.brand._id);
            setQuantity(data.quantity);
            setId(data._id);
            console.log(data);
            loader.classList.add("d-none")
        }
        catch(error){
            console.log(error);
        }
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            loader.classList.remove("d-none")
            const productData = new FormData();
            photo && productData.append("photo", photo);
            productData.append("title", title);
            productData.append("description", description);
            productData.append("price", price);
            category && productData.append("category", category);
            brand && productData.append("brand", brand);
            productData.append("quantity", quantity);

            const { data } = await axios.put(`/product/${id}`, productData);
            loader.classList.add("d-none")
            if(data?.error){
                toast.error(data.error);
            }
            else{
                toast.success(`Product Updated successfully`);
                navigate('/dashboard/admin/products');
            }
        }
        catch(error){
            console.log(error);
            toast.error('Product create failed. try again later');
        }
    };
        

    return (
        <Fragment>
            <div className='d-none' ref={(div)=>loader=div}>
                <FullscreenLoader/>
            </div>
            <div className=" overflow-hidden">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                    <div class="container w-75 mt-5">
                        <form onSubmit={handleSubmit}>
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
                            
                            {/* Photo Upload */}
                            <div className='pt-2'>
                                <label className='secondary-btn text-center col-12 mb-3'>

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
                            <div class="form-group">
                                <input 
                                type="text" 
                                className="form-control my-2" 
                                placeholder='Product Name' 
                                id="product-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                                />
                            </div>
                            <div class="form-group">
                                
                                <textarea 
                                class="form-control my-2" 
                                placeholder='Description' 
                                id="product-description" rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <Select
                                showSearch
                                value={category}
                                bordered={false}
                                size="small"
                                className='form-select my-2 p-2 '
                                placeholder='Choose Category'
                                onChange={(value) => setCategory(value)}
                                dataSource={Option}
                                filterOption={(inputValue, Option) => Option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            >

                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            <Select
                                showSearch
                                value={brand}
                                bordered={false}
                                size="small"
                                className='form-select mb-3'
                                placeholder='Choose Brand'
                                onChange={(value) => setBrand(value)}
                                dataSource={Option}
                                filterOption={(inputValue, Option) => Option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            >
                                {brands?.map((b) => (
                                    <Option key={b?._id} value={b?._id}>
                                        {b?.name}
                                    </Option>
                                ))}
                            </Select>

                            <div class="form-group">
                                <input 
                                type="number" 
                                className="form-control my-2" 
                                placeholder="Enter price"
                                id="product-price" 
                                min="0" 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div class="form-group">
                                <input 
                                type="number" 
                                className="form-control my-2" 
                                id="product-quantity" 
                                placeholder="Quantity" 
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="0" />
                            </div>
                            <div className="my-2">
                                <button type="submit" class="secondary-btn">Create Product</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Product;








// import { Select } from 'antd';
// import { Option } from 'antd/es/mentions';
// import axios from 'axios';
// import React, { Fragment, useEffect, useRef, useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { useNavigate ,useParams} from 'react-router-dom';
// import AdminMenu from '../../nav/AdminMenu';
// import FullscreenLoader from '../../nav/FullscreenLoader';

// const ProductUpdate = () => {

//     let loader = useRef();
//     const params = useParams();

//     useEffect(()=>{
//         loadCategories();
//         loadBrands();
//     },[]);

//     const [categories, setCategories] = useState([]);
//     const [category, setCategory] = useState([]);
//     const [brand, setBrand] = useState("");
//     const [brands, setBrands] = useState("");
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [photo, setPhoto] = useState("");
//     const [id, setId] = useState("");

//     const navigate = useNavigate();

//     useEffect(()=>{
//         loadBrands();
//         loadCategories();
//         loadProducts();
//     },[])
    
//     // Category Load
//     const loadCategories =async () =>{
//         try{
//             const { data } = await axios.get('/categories');
//             setCategories(data);
//         }
//         catch(error){
//             console.log(error);
//         }
//     }

//     // Category Load
//     const loadBrands =async () =>{
//         try{
//             const  {data}  = await axios.get('/brands');
//             setBrands(data);
//         }
//         catch(error){
//             console.log(error);
//         }
//     }

//     const loadProducts =async () =>{
//         try{
//             const { data } = await axios.get(`/product/${params.slug}`);
//             setTitle(data.title);
//             setDescription(data.description);
//             setPrice(data.price);
//             setCategory(data.category._id);
//             setBrand(data.brand);
//             setQuantity(data.quantity);
//             setId(data._id);
//         }
//         catch(error){
//             console.log(error);
//         }
//     }
    
//     // Product Submit
//     const handleUpdate = async (e) =>{
//         e.preventDefault();
            
//         try{
//             const productData = new FormData();
//             productData.append("photo", photo);
//             productData.append("title", title);
//             productData.append("description", description);
//             productData.append("price", price);
//             productData.append("category", category);
//             productData.append("brand", brand);
//             productData.append("quantity", quantity);
            
//             loader.classList.remove("d-none")
//             const { data } = await axios.post(`/product/${"id"}`, productData);
//             loader.classList.add("d-none")
//             if(data?.error){
//                 toast.error(data.error);
//             }
//             else{
//                 toast.success(`'${data.name}' is created successfully`);
//                 navigate('/dashboard/admin/products');
//             }
//         }
//         catch(error){
//             console.log(error);
//             toast.error('Product create failed. try again later');
//         }
//     };
        

//     return (
//         <Fragment>
//             <div className='d-none' ref={(div)=>loader=div}>
//                 <FullscreenLoader/>
//             </div>
//             <div className=" overflow-hidden">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <AdminMenu/>
//                     </div>
//                     <div className="col-md-9">
//                     <div class="container w-75 mt-5">
//                         <form onSubmit={handleUpdate}>
//                             {/*  Photo Show */}
//                             {photo && (
//                                 <div className='text-center'>
//                                     <img 
//                                         src={URL.createObjectURL(photo)} 
//                                         alt="Product Photo"
//                                         className="img img-responsive rounded "
//                                         height="150px"
//                                     />
                                        
//                                 </div>
//                             )}
                            
//                             {/* Photo Upload */}
//                             <div className='pt-2'>
//                                 <label className='secondary-btn text-center col-12 mb-3'>

//                                     {photo ? photo.name : "Upload photo"}
                                    
//                                     <input
//                                         type="file"
//                                         name="photo"
//                                         accept="image/*"
//                                         onChange={(e)=> setPhoto(e.target.files[0])}
//                                         hidden
//                                     ></input>
//                                 </label>
//                             </div>
//                             <div class="form-group">
//                                 <input 
//                                 type="text" 
//                                 className="form-control my-2" 
//                                 placeholder='Product Name' 
//                                 id="product-title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)} 
//                                 />
//                             </div>
//                             <div class="form-group">
                                
//                                 <textarea 
//                                 class="form-control my-2" 
//                                 placeholder='Description' 
//                                 id="product-description" rows="3"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 ></textarea>
//                             </div>

//                             <Select
//                                 showSearch
//                                 bordered={false}
//                                 size="small"
//                                 className='form-select my-2 p-2 '
//                                 placeholder='Choose Category'
//                                 onChange={(value) => setCategory(value)}
//                                 dataSource={Option}
//                                 filterOption={(inputValue, Option) => Option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
//                             >

//                                 {categories?.map((c) => (
//                                     <Option key={c._id} value={c._id}>
//                                         {c.name}
//                                     </Option>
//                                 ))}
//                             </Select>

//                             <Select
//                                 showSearch
//                                 bordered={false}
//                                 size="small"
//                                 className='form-select mb-3'
//                                 placeholder='Choose Brand'
//                                 onChange={(value) => setBrand(value)}
//                                 dataSource={Option}
//                                 filterOption={(inputValue, Option) => Option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
//                             >
//                                 {brands?.map((b) => (
//                                     <Option key={b?._id} value={b?._id}>
//                                         {b?.name}
//                                     </Option>
//                                 ))}
//                             </Select>

//                             <div class="form-group">
//                                 <input 
//                                 type="number" 
//                                 className="form-control my-2" 
//                                 placeholder="Enter price"
//                                 id="product-price" 
//                                 min="0" 
//                                 value={price}
//                                 onChange={(e) => setPrice(e.target.value)}
//                                 />
//                             </div>
//                             <div class="form-group">
//                                 <input 
//                                 type="number" 
//                                 className="form-control my-2" 
//                                 id="product-quantity" 
//                                 placeholder="Quantity" 
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(e.target.value)}
//                                 min="0" />
//                             </div>
//                             <div className="my-2">
//                                 <button type="submit" class="secondary-btn">Create Product</button>
//                             </div>
//                         </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default ProductUpdate;