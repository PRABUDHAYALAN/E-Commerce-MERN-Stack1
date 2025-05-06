import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Component/assets/dropdown_icon.png';
import Item from '../Component/Item/Item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState(''); // 🔥 search term

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="shop-category">
      <img src={props.banner} alt="banner" className="shopcategory-banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {all_product.length}</span> products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      {/* 🔥 Add Search Input */}
      <div className="shopcategory-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="shopcategory-products">
        {all_product
          .filter(item => 
            props.category === item.category && 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>

      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
