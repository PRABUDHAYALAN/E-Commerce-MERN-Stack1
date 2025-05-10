import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null); // ✅ State for selected size

  // ✅ Sizes array for easy mapping
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img-list'>
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
        </div>
        <div className='productdisplay-img'>
          <img className='productdisplay-main-img' src={product.image} alt='' />
        </div>
      </div>

      <div className='productdisplay-right'>
        <h1>{product.name}</h1>

        <div className='productdisplay-right-star'>
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_dull_icon} alt='' />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">₹{product.new_price}</div>
          <div className="productdisplay-right-price-old">₹{product.old_price}</div>
        </div>

        <div className="productdisplay-right-description">
          This is a great product. Stylish, durable, and perfect for everyday use
        </div>

        {/* 🔥 Size selection logic */}
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size-list">
            {sizes.map((size) => (
              <div
                key={size}
                className={`productdisplay-size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => {
          if (!selectedSize) {
            alert("Please select a size!");
            return;
          }
          addToCart(product.id, selectedSize); // ✅ Send size to the context
        }}>
          ADD TO CART
        </button>

        <p className='productdisplay-right-category'><span>Category :</span>Women, T-Shirt, Crop Top</p>
        <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p>
      </div>
    </div>
  )
};

export default ProductDisplay;
