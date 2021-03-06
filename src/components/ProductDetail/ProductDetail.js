import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const {productKey} = useParams();
    useEffect(() => {
        fetch('http://localhost:8800/product/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, [productKey])
    return (
        <div>
            <h1>Your Product Detail</h1>
            {
                product && <Product showAddToCart={false} product ={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;