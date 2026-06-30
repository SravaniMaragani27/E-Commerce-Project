import React from 'react'
import {Link} from 'react-router-dom'
import { useCart } from '../Context/CartContext'


function ProductCard({ product }) {
// const {cartItems,addToCart} = useContext(CartContext);

const {cartItems,addToCart}  = useCart()

const productInCart = cartItems.find((item)=>item.id === product?.id);
const productQuantityLable = productInCart ? `(${productInCart.quantity})`:" ";


  return (
   <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image"/>
              <div className="product-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">${product.price.toFixed(2)}</p>
                <div className="product-card-action">
                <Link to={`/products/${product.id}`} className=" btn btn-secondary">
                  View Details
                </Link>
                <button className="btn btn-primary" onClick={()=>addToCart(product.id)}>Add to Cart{productQuantityLable}</button>
                </div>
              </div>
            </div>
  )
}

export default ProductCard