import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
//    console.log(props);
    const { name, img, seller, price, stock, key } = props.product;
    return (
        <div className = "product">
            <div>
                <img src={img} alt="" />
                <h1>hhhh</h1>
            </div>
            <div>
                <h4 className ="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br/>
                <p><small>By : {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button onClick={()=>props.handleAddProduct(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;