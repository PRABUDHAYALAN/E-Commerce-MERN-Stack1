import React, { useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className='items'>
      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="items" />
      </Link>

      <p>{props.name}</p>
      <div className='items-price'>
        <div className='items-price-new'>₹{props.new_price}</div>
        <div className='items-price-old'>₹{props.old_price}</div>
      </div>

      {/* Add to Cart Button */}
      <button 
        className='items-add-to-cart' 
        onClick={() => addToCart(props.id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Item;
