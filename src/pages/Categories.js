import '../assets/css/categories.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {

    const [category, setCategory] = useState([]);

    useEffect(()=>{
        loadCategories();
    },[]);
    // category Load
    const loadCategories =async () =>{
        try{
            const { data } = await axios.get('/categories');
            setCategory(data);
        }
        catch(error){
            console.log(error);
        }
    }


    return (
        <div>
            <div class=" container cards-list align-middle ">
            {category?.map((c)=>(
                <div class="cat-card 1">
                    <div class="card_image rounded mx-auto d-block"> <img src={`${process.env.REACT_APP_API}/category/photo/${c?._id}`} /> </div>
                    <div class="card_title title-white">
                    <p ><Link className='primary-text' to={`/category/${c.slug}`}>{c?.name}</Link></p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Categories;