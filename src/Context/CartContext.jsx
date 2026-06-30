import { createContext, useContext, useState ,useEffect} from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);



export default function CartContextProvider({children}){

const [cartItems,setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });//{id:2,quantity:7}


 // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

function addToCart(productId){
    // if already cart has the item then add the new item with the existing items.
    // const existingItem = cartItems.find((item)=>item.id === productId);

    // if(existingItem){
    //    const currentQuantity = existingItem.quantity;
    //    const updatedCartItems = cartItems.map((item)=> item.id === productId ? {...item,id:productId,quantity:currentQuantity+1}:item);
    //   setCartItems(updatedCartItems);
    // }else{
    //     // cartItems.push({id:productId,quantity:1});
    //     // add the new item at the end of the array
    //     // setCartItems([...existingItem,{id:productId , quantity:1}]);
    //     setCartItems([...cartItems,{id:productId , quantity:1}]);
        
    // }


    setCartItems((prevItems)=>{
        const existingItem = prevItems.find((item)=>item.id === productId);
        if(existingItem){
            return prevItems.map((item)=> item.id === productId ? {...item ,quantity:item.quantity+1}:item);
        }
        return [...prevItems,{id:productId,quantity:1}]
    });
}

 
function getCartItemsWithProducts(){
console.log(cartItems);

    return cartItems.map((item)=>({
        ...item,
        product:getProductById(item.id)
    })).filter((item)=>item.product);

}

// console.log(getCartItemsWithProducts);


function removeFromCart(productId){
    setCartItems(cartItems.filter(item=>item.id !== productId));
}


function updateQuantity(productId,quantity){
    if(quantity <=0){
      removeFromCart(productId);
      return;
    }

setCartItems(cartItems.map((item)=>item.id === productId ? {...item,quantity}:item));
}


function getCartTotal(){
    const total = cartItems.reduce((total,item)=>{
        const product=getProductById(item.id);
        return total + (product ? product.price * item.quantity:0);
    },0);
    return total;
}

function placeOrder(){
  alert("Successful Order!");
  setCartItems([]);
}


    return <CartContext.Provider value={{cartItems,addToCart,getCartItemsWithProducts,updateQuantity,removeFromCart,getCartTotal,placeOrder}}>{children}</CartContext.Provider>
}

export function useCart(){
    const context = useContext(CartContext);
    console.log(context);
    
    return context;
}