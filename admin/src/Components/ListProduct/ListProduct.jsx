import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://e-commerce-mern-stack-5.onrender.com/allproducts");
      const data = await res.json();
      setAllProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      // Optimistic UI: update immediately
      setAllProducts(prev => prev.filter(product => product.id !== id));

      await fetch("https://e-commerce-mern-stack-5.onrender.com/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to remove product:", err);
      alert("Failed to remove product.");
      await fetchInfo(); // fallback to sync state
    }
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : allProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <>
          <div className="listproduct-format-main header">
            <p>Product</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allProducts.map((product, index) => (
              <div key={index} className='listproduct-format-main listproduct-format'>
                <img src={product.image} alt={product.name} className='listproduct-product-icon' />
                <p>{product.name}</p>
                <p>₹{product.old_price}</p>
                <p>₹{product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => removeProduct(product.id)}
                  src={cross_icon}
                  alt="Remove"
                  className="listproduct-remove-icon"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduct;
