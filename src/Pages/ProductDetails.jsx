import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products';
// import products from '../data/products';
import { useCart } from '../Context/CartContext'


function ProductDetails() {
  const {id} = useParams();
  const [product,setProduct] = useState(null);

  const navigate = useNavigate();

  const {cartItems,addToCart}  = useCart()
  

   useEffect(()=>{
    const foundProduct = getProductById(id);
    console.log(foundProduct);

    if(!foundProduct){
      navigate("/");
      return;
    }

    setProduct(foundProduct);
  },[id])


  if (!product) {
    return <h2>Loading...</h2>;
  }


  const productInCart = cartItems.find((item)=>item.id === product?.id);
  
  const productQuantityLable = productInCart ? `(${productInCart.quantity})`:" ";
  


  return (
    <div className='page'>
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img className="product-img"src={product.image} alt={product.name}/>
          </div>
          <div className="product-datail-content">
            <h1 className='product-detail-name'>{product.name}</h1>
            <p className='product-detail-price'>${product.price}</p>
            <p className='product-detail-description'>{product.description}</p>
            <button className='btn btn-primary' onClick={()=>addToCart(product.id)}>Add Product{productQuantityLable}</button>
          </div>
        </div>
      </div>
      {/* productDetails{id} */}
      </div>
  )
}

export default ProductDetails