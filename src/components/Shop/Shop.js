import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart]=useState([]);
    const handleAddProduct =(pd) =>{
        console.log('Product added', pd);
        const newCart = [...cart, pd];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                 products.map(product => <Product 
                    product = {product} handleAddProduct ={handleAddProduct}
                    ></Product>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;