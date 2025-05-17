import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

// Helper function to initialize the default cart structure
const getDefaultCart = (products) => {
  let cart = {};
  for (let i = 0; i < products.length; i++) {
    cart[products[i].id] = [];
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // 🟢 Fetch products and initialize cart
  useEffect(() => {
    fetch("https://e-commerce-mern-stack1.onrender.com/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAll_Product(data);

        // 🟢 Fetch cart data if user is authenticated
        const token = localStorage.getItem("auth-token");
        if (token) {
          fetch("https://e-commerce-mern-stack1.onrender.com/getcart", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "auth-token": token,
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
              }
              return response.json();
            })
            .then((data) => {
              const formattedData = {};
              Object.keys(data).forEach((id) => {
                formattedData[id] = Array.isArray(data[id]) ? data[id] : [];
              });
              setCartItems(formattedData);
            })
            .catch((error) => console.error("Error fetching cart:", error.message));
        } else {
          setCartItems(getDefaultCart(data));
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // 🟢 Add to Cart
  const addToCart = (id, size) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (!Array.isArray(newCart[id])) {
        newCart[id] = [];
      }
      const existingItem = newCart[id].find((item) => item.size === size);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newCart[id].push({ size, quantity: 1 });
      }

      return newCart;
    });

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("https://e-commerce-mern-stack1.onrender.com/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: id, size }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  // 🟢 Remove from Cart
  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId]) {
        const itemIndex = newCart[itemId].findIndex((item) => item.size === size);

        if (itemIndex !== -1) {
          if (newCart[itemId][itemIndex].quantity > 1) {
            newCart[itemId][itemIndex].quantity -= 1;
          } else {
            newCart[itemId].splice(itemIndex, 1);
          }
        }

        if (newCart[itemId].length === 0) {
          delete newCart[itemId];
        }
      }
      return newCart;
    });

    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("https://e-commerce-mern-stack1.onrender.com/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, size }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Item removed from backend");
          } else {
            console.error("Failed to remove item from backend:", data.message);
          }
        })
        .catch((error) => console.error("Error removing from cart:", error.message));
    }
  };

  // 🟢 Get Total Amount of Cart Items
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (Array.isArray(item)) {
        for (const cartItem of item) {
          const itemInfo = all_product.find((product) => product.id === Number(itemId));
          if (itemInfo) {
            totalAmount += itemInfo.new_price * cartItem.quantity;
          }
        }
      }
    }
    return totalAmount;
  };

  // 🟢 Get Total Number of Items in the Cart
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const itemId in cartItems) {
      const item = cartItems[itemId];
      if (Array.isArray(item)) {
        for (const cartItem of item) {
          totalItem += cartItem.quantity;
        }
      }
    }
    return totalItem;
  };

  // 🟢 Context Values
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  // 🟢 Return Provider
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
