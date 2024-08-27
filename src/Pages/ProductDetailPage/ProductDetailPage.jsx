import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ItemDetail from '../../Component/ItemDetail/ItemDetail';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setItem(response.data));
    }, [id]);

    return (
        <div className='container'>
            <button className='btn btn-primary my-3' onClick={() => navigate('/')}>Previous</button>
            {item && <ItemDetail item={item} />}
        </div>
    );
}

export default ProductDetailPage;
