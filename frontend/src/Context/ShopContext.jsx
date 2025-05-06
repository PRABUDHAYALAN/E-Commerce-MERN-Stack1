import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (let i = 0; i < products.length; i++) {
    cart[products[i].id] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch("https://e-commerce-mern-stack-5.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAll_Product(data);
        setCartItems(getDefaultCart(data));
      if (localStorage.getItem('auth-token')){
        fetch('https://e-commerce-mern-stack-5.onrender.com/getcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:"",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data));
      
    }
      
      });
  }, []);




  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  
    if (localStorage.getItem('auth-token')) {
      fetch('https://e-commerce-mern-stack-5.onrender.com/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json', 
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
        fetch('https://e-commerce-mern-stack-5.onrender.com/removefromcart', {
            method: 'POST',
            headers: {
              Accept: 'application/json', 
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: itemId }),
          })
            .then((response) => response.json())
            .then((data) => console.log(data))

    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
