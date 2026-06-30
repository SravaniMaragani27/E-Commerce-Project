import React from "react";
import { useCart} from '../Context/CartContext'
import { getProductById } from '../data/products'
// import { useContext } from 'react';

function Checkout() {
  // const { cartItems } = useCart();
const { getCartItemsWithProducts,removeFromCart,updateQuantity,getCartTotal,placeOrder } = useCart();

const cartWithProducts = getCartItemsWithProducts();

const total = getCartTotal();

  console.log(cartWithProducts);

    if (cartWithProducts.length === 0) {
    return <h2 className="page">Cart is empty</h2>;
  }

  


  return (
    <div className='page'>
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Summary</h2>
             <div>czzxcz</div>
             
            {cartWithProducts.map((item) => (
              <div key={item.id} className='checkout-item'key={item.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className='checkout-item-image'
                />
                <div className="checkout-item-details">
                  <h3 className="checkout-item-name">{item.product.name}</h3>
                  <p className="checkout-item-price">${item.product.price} Each</p>
                </div>
                <div className="checkout-item-controls">
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={()=>updateQuantity(item.id,item.quantity-1)} >-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-btn"  onClick={()=>updateQuantity(item.id, item.quantity+1)}>+</button>
                  </div>
                  <p className="checkout-item-total">{(item.product.price*item.quantity).toFixed(2)}</p>
                
                <button className="btn btn-secondary" onClick={()=>removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h2 className="checkout-section-title">Total</h2>
            <div className="checkout-total">
              <p className="checkout-total-label">Subtotal:</p>
              <p className="checkout-total-value">{total.toFixed(2)}</p>
            </div>
            <div className="checkout-total">
              <p className="checkout-total-label">Total:</p>
              <p className="checkout-total-value">${total.toFixed(2)}</p>
            </div>
            <button className="btn btn-primary btn-large btn-block" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;