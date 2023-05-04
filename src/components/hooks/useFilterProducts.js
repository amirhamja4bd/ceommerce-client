import axios from 'axios';
import React, { useEffect, useState } from 'react';


const useFilterProducts = () => {
    const [categories , setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [sliderValue, setSliderValue] = useState({ min: 0, max: 1000 });
    const [filters, setFilters] = useState({ minPrice: 0, maxPrice: 1000, bestSell: false, keyword: '', sort: '', perPage: 12 });

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
    
    return [categories, selectedCategories, brands, selectedBrands, products, totalPages, currentPage, setCurrentPage , sliderValue, filters ]
};

export default useFilterProducts;