import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Component/Item/Item.jsx';
import { FiChevronDown } from 'react-icons/fi'; // ✅ Import icon from react-icons

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default');
  const [visibleItems, setVisibleItems] = useState(8); // initial number of products displayed

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handler for sort change
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Handler for "Explore More" button
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 8);
  };

  // 🔥 Filter and sort logic
  const filteredProducts = all_product
    .filter(
      (item) =>
        props.category === item.category &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortType) {
        case 'price-low-high':
          return a.new_price - b.new_price;
        case 'price-high-low':
          return b.new_price - a.new_price;
        case 'name-a-z':
          return a.name.localeCompare(b.name);
        case 'name-z-a':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="shop-category">
      <img src={props.banner} alt="banner" className="shopcategory-banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> products
        </p>

        <div className="shopcategory-sort">
          <select onChange={handleSortChange} value={sortType}>
            <option value="default">Sort by</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A-Z</option>
            <option value="name-z-a">Name: Z-A</option>
          </select>

          <FiChevronDown className="sort-icon" /> {/* ✅ Replaced img with icon */}
        </div>
      </div>

      <div className="shopcategory-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="shopcategory-products">
        {filteredProducts.slice(0, visibleItems).map((item, i) => (
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

      {visibleItems < filteredProducts.length && (
        <div className="shopcategory-loadmore" onClick={handleLoadMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
