import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';

const Review = () => {
    const [cart, setCart]=useState([]);
    const [orderPlace]=useState(false);

    const auth = useAuth();

    const removeItem =(product)=>{
        const newCart = cart.filter(pd => pd.key !== product);
        setCart(newCart);
        removeFromDatabaseCart(product);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);
        fetch('http://localhost:8800/getProductByKey', {
            method:'POST',
            body : JSON.stringify(productKeys),
            headers : {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                const cartProducts= productKeys.map(key => {
                    const product = data.find(pd => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                })
                   setCart(cartProducts);
        })

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
                !cart.length && <h1>Your cart is empty!. please <a href="/shop">keep shopping</a></h1>
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