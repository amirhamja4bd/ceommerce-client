import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/card/ProductCard";
import ReactPaginate from "react-paginate";
import  '../assets/css/shop.css'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const Shopping=()=> {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [sliderValue, setSliderValue] = useState({ min: 0, max: 1000 });
    const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 1000, bestSell: false, keyword: '', sort: '', perPage: 12 });
 
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

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          setSelectedCategories([...selectedCategories, value]);
        } else {
          setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
        }
    };
    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedBrands([...selectedBrands, value]);
        } else {
            setSelectedBrands(selectedBrands.filter((cat) => cat !== value));
        }
    };
    const handleResetFilter = () => {
        setSelectedCategories([])
        setSelectedBrands([])
      }
    

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mt-4" >
                        <div className="bg-light p-3 shadow-sm">
                            <h5 className="ps-4 pb-2 border-bottom">Filter By Categories</h5>
                            {categories.map((category) => (
                                <div key={category._id} className="ms-4">
                                <label>
                                    <input
                                        style={{height:"14px", width:"14px"}}
                                        className="me-2 bg-light"
                                        type="checkbox"
                                        value={category._id}
                                        checked={selectedCategories.includes(category._id)}
                                        onChange={handleCategoryChange}
                                    />
                                    {category.name}
                                </label>
                                </div>
                            ))}
                        </div>
                        <div className="bg-light p-3 mt-3 filter  shadow-sm">
                            <h5 className="ps-4 pb-2 border-bottom">Filter By Brand</h5>
                            {brands.map((brand) => (
                                <div key={brand._id} className="ms-4">
                                <label>
                                    <input
                                        style={{height:"14px", width:"14px"}}
                                        className="me-2 bg-light"
                                        type="checkbox"
                                        value={brand._id}
                                        checked={selectedBrands.includes(brand._id)}
                                        onChange={handleBrandChange}
                                    />
                                    {brand.name}
                                </label>
                                </div>
                            ))}
                        </div>
                        
                        <div className=" px-4 mt-3 bg-light py-5 text-center  shadow-sm">
                            <h5 style={{marginTop:"-30px" , paddingBottom:"25px"}} >Filter By Price</h5>
                            <InputRange
                                maxValue={1000}
                                minValue={0}
                                value={sliderValue}
                                onChange={(value) => {
                                    setSliderValue(value);
                                    setFilters({ ...filters, minPrice: value.min, maxPrice: value.max });
                                }}
                                formatLabel={(value) => `$${value}`}
                            />
                        </div>
                        <div className="px-4 mt-3">
                            <button 
                                onClick={handleResetFilter}
                                className="secondary-btn w-100"
                                >Reset Filter
                            </button>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className=" d-flex mt-4 mx-3">
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
                        <div className="row m-0 p-0 ">
                            {products?.map((p) => (
                                <div className="col-md-3 mt-4" key={p?._id}>
                                    <ProductCard p={p} />
                                </div>
                            ))}
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
        </>
    );
}

export default Shopping;
