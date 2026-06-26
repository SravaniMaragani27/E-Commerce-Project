import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/products';
// import products from '../data/products';

function ProductDetails() {
  const {id} = useParams();
  const [product,setProduct] = useState(null);

  const navigate = useNavigate();

 
  // const getProductsById = (id) =>{
  //   const fuondProduct = products.find((item)=>item.id === Number(id));
  //   return foundProduct;
     
  //   // or get single products

  //   // const getproducts = products;
  //   // const singleProduct = getproducts.find((item) => item.id === Number(id));
  //   // return singleProduct;
  // }

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
            <button className='btn btn-primary'>Add Product</button>
          </div>
        </div>
      </div>
      {/* productDetails{id} */}
      </div>
  )
}

export default ProductDetails