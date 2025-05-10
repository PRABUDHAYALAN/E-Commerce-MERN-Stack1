import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className='cartitems'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id]) {
          return cartItems[product.id].map((item, index) => (
            <div key={`${product.id}-${item.size}-${index}`} className="cartitems-row">
              <img src={product.image} alt='' className='carticon-product-icon' />
              <p>{product.name}</p>
              <p>{item.size}</p>
              <p>₹{product.new_price.toFixed(2)}</p>
              <button className='cartitems-quantity'>{item.quantity}</button>
              <p>₹{(product.new_price * item.quantity).toFixed(2)}</p>
              <img
                className='cartitems_remove_icon'
                src={remove_icon}
                onClick={() => { removeFromCart(product.id, item.size) }}
                alt='remove'
              />
            </div>
          ));
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Free</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalCartAmount().toFixed(2)}</h3>
            </div>
          </div>

          <button onClick={() => navigate('/checkout')}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type='text' placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
