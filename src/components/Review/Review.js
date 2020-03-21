import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';

const Review = () => {
    const [cart, setCart]=useState([]);
    const [orderPlace, setOrderPlace]=useState(false);

    const auth = useAuth();

    const handleOrderPlace =()=>{
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }
    const removeItem =(product)=>{
        const newCart = cart.filter(pd => pd.key !== product);
        setCart(newCart);
        removeFromDatabaseCart(product);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts= productKeys.map(key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
        return product;
    })
       setCart(cartProducts);

    },[])
    let thankYou;
    if(orderPlace){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="shop-container">
         <div className="product-container">
         {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeItem={removeItem}
                     product={pd}>

                     </ReviewItem>)
            }
            {thankYou}
            {
                !cart.length && <h>Your cart is empty!. please <a href="/shop">keep shopping</a></h>
            }
         </div>
         <div className="cart-container">
             <Cart cart={cart}>
                 <Link to="Shipment">
                     {
                         auth.user ?
                    <button  className="main-button">CheckedOut</button> :
                    <button  className="main-button">proceed to Login</button>
                     }
                
                 </Link>
                
             </Cart>
         </div>
        </div>
    );
};

export default Review;