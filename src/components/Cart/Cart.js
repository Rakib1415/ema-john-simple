import React from 'react';
import { useAuth } from '../Login/UseAuth';



const Cart = (props) => {
    const cart = props.cart;
    const auth = useAuth();
    // console.log(auth.user);

   let total = 0;
   for(let i = 0; i< cart.length; i++){
       const product = cart[i];
       total = total + product.price * product.quantity;
       
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
                <h3 className="bg-primary">Order Summary</h3>
                <p>Items Ordered :{cart.length} </p>
                <p>Product price :{total}</p>
                <p><small>Shipping Cost : {shipping}</small></p>
                <p><small>Tax or Vat : {tax}</small></p>
                <p>Total Price : {total + shipping + tax}</p>
               {
                   props.children
               }
        </div>
    );
};

export default Cart;