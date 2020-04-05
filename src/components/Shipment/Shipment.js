import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import {useAuth} from '../Login/UseAuth'
import { processOrder, getDatabaseCart } from '../../utilities/databaseManager';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  
  const onSubmit = data => {
    const savedCart = getDatabaseCart();
    const orderDetails = {email:auth.user.email, cart: savedCart }
    console.log(orderDetails)
    fetch('http://localhost:8800/placeOrder',{
      method:'POST',
      body : JSON.stringify(orderDetails),
      headers : {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => {
        alert('successfully order placed with id : '+data._id);
        processOrder();
    })

  }
  
    
    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder='your name'/>
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder='Your Email'/>
          {errors.email && <span className="error">Email is required</span>}
          <input name="addressLine1" ref={register({ required: true })} placeholder='addressLine1' />
          {errors.addressLine1 && <span className="error">address is required</span>}
          <input name="addressLine2" ref={register({ required: true })} placeholder='addressLine2'/>
          {errors.addressLine2 && <span className="error">addressLine2 is required</span>}
          <input name="city" ref={register({ required: true })} placeholder='City'/>
          {errors.city && <span className="error">City is required</span>}
          <input name="zipcode" ref={register({ required: true })} placeholder='Zip Code'/>
          {errors.zipcode && <span className="error">Zipcode is required</span>}
          <input name="country" ref={register({ required: true })} placeholder='Country'/>
          {errors.country && <span className="error">Country is required</span>}
          
          <input type="submit" />
 
        </form>
    );
};

export default Shipment;