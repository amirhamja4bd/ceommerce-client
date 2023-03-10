import '../assets/css/categories.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <div class="cards-list align-middle">
            {category?.map((c)=>(
                <div class="cat-card 1">
                    <div class="card_image rounded mx-auto d-block"> <img src={`${process.env.REACT_APP_API}/category/photo/${c?._id}`} /> </div>
                    <div class="card_title title-white">
                    <p>{c?.name}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Categories;