import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/card/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "./Prices";

const Shop=()=> {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [radio, setRadio] = useState([]); // radio
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        loadProducts();
        if (!checked.length || !radio.length) loadProducts();
        getTotal();
    }, []);

    useEffect(() => {
        if (checked.length || radio.length) loadFilteredProducts();
    }, [checked, radio]);

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    //pagination start
    const getTotal = async () => {
        try {
          const { data } = await axios.get("/products-count");
          setTotal(data);
        } catch (err) {
          console.log(err);
        }
      };

      // Load More
    const loadMore = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/list-products/${page}`);
          setProducts([...products, ...data]);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
    };

    //
    const loadProducts = async () => {
        try {
            const { data } = await axios.get(`/list-products/${page}`);
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };
    //pagination end

    const loadFilteredProducts = async () => {
        try {
            const { data } = await axios.post("/filtered-products", { checked, radio, }); 
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheck = (value, id) => {
        console.log(value, id);
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-3">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            Filter by Categories
                        </h2>
                        <div className="row ps-5">
                                {categories?.map((c) => (
                                    <div key={c?._id} style={{ marginLeft: "8px" }}>
                                        <Checkbox key={c?._id} onChange={(e) => handleCheck(e.target.checked, c?._id)} value={c?.array}>{c?.name}</Checkbox>
                                    </div>
                                ))}
                        </div>

                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            Filter by Price
                        </h2>
                        <div className="row ps-5">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {prices?.map((p) => (
                                    <div key={p._id} style={{ marginLeft: "8px" }}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </div>
                        <div className="p-5 pt-0 mt-5">
                            <button
                                className="secondary-btn col-12"
                                onClick={() => window.location.reload()}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                            {products?.length} Products
                        </h2>

                        <div className="row">
                            
                            {products?.map((p) => (
                                <div className="col-md-4 mt-4" key={p?._id}>
                                    <ProductCard p={p} />
                                </div>
                            ))}
                             <div className="container text-center p-5">
                                {products && products.length < total && (
                                <div className='divider'>
                                <div class="dividermask"></div> 
                                <button
                                    className="btn btn-light btn-lg col-md-6 pt-1 text-center"
                                    disabled={loading}
                                    onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                    }}
                                >
                                    {loading ? "Loading..." : "Load more"}
                                </button>
                                </div> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
