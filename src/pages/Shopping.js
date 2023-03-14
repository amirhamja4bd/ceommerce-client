import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/card/ProductCard";
import ReactPaginate from "react-paginate";

const Shopping=()=> {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', category: '', brand: '', bestSell: false, keyword: '', sort: '', perPage: 5, });
    

    useEffect(()=>{
        loadFilterProducts()
    },[filters, currentPage])
    
    useEffect(() => {
        loadCategories();
        loadBrands();
    }, []);
    
    const loadFilterProducts = async () => {
        try {
            const { data } = await axios.post(`/filter-products?perPage=${filters.perPage}`); 
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setCurrentPage(Math.ceil(totalPages / filters.perPage));
            console.log("dataaaaa",data);
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
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const handlePageClick = async (data) => {
        
      };

    

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">

                    </div>

                    <div className="col-md-9">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center"> {products?.length} Products </h2>
                        <div className="row">
                            {products?.map((p) => (
                                <div className="col-md-3 mt-4" key={p?._id}>
                                    <ProductCard p={p} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-center"}
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
        </>
    );
}

export default Shopping;
