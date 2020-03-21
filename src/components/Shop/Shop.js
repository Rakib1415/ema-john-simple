import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart]=useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey =>{
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity= savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
        

    },[])
    
    const handleAddProduct =(pd) =>{
        // console.log('Product added', pd);
        const sameProduct = cart.find(p => p.key === pd.key);
        
        let count =1;
        let newCart;
        if(sameProduct){
             count = sameProduct.quantity + 1;
             sameProduct.quantity = count;
             const others = cart.filter(p => p.key !==pd.key );
             
             newCart =[...others, sameProduct];
        }
        else{
            pd.quantity = 1;
            newCart =[...cart, pd];
        }
        
        setCart(newCart);
        addToDatabaseCart(pd.key,count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                 products.map(product => <Product showAddToCart ={true} key={product.key}
                    product = {product} handleAddProduct ={handleAddProduct}
                    ></Product>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Order review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;