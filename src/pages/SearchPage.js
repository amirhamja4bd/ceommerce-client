import React from 'react';
import ProductCard from '../components/card/ProductCard';
import { useSearch } from '../context/SearchContext';
import image from '../assets/img/notFound.png'

const SearchPage = () => {
    const [search, setSearch] = useSearch();

    return (
        <div>
            <div className="container">
                <div className="py-4 text-center lead">
                    {search?.results?.length < 1 ? <p className='text-center mt-0'><img src={image} alt="Product Not Found"/> <p className='fs-1'>Product Not Found</p></p> : ` ${search?.results?.length} Products Found`}
                </div>
                <div className="row">
                    {search?.results?.map((p)=>(
                        <div key={p?._id} className="col-md-3">
                            <p>{p?.title}</p>
                            <ProductCard p={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;