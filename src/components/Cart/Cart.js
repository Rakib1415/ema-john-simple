import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
   // const total = cart.reduce((total, prd) => total + prd.price, 0);
   let total = 0;
   for(let i = 0; i< cart.length; i++){
       const product = cart[i];
       total = total + product.price;
   }
   let shipping = 0;
   if(total > 35){
       shipping = 0;
   }
   else if(total > 15){
       shipping = 4.99;
   }
   else if(total >0){
       shipping = 12.99;
   }
   const tax = Math.round(total/10);
    return (
        <div>
                <h3>Order Summary</h3>
                <p>Items Ordered :{cart.length} </p>
                <p>Product price :{total}</p>
                <p><small>Shipping Cost : {shipping}</small></p>
                <p><small>Tax or Vat : {tax}</small></p>
                <p>Total Price : {total + shipping + tax}</p>
        </div>
    );
};

export default Cart;