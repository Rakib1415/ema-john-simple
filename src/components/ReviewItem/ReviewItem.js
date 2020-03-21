import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;
    const removeItemStyle ={
        borderBottom : '2px solid gray',
        margin : '5px',
        padding : '5px',
        marginLeft : '200px'
    } 
    return (
        <div style={removeItemStyle}>
            <h3 className="product-name">Product name:{name}</h3>
            <p>quantity: {quantity}</p>
            <br/>
            <p><small>$ {price}</small></p>
            <button 
            onClick={()=>props.removeItem(key)}
            className="main-button">Remove Item</button>
        </div>
    );
};

export default ReviewItem;