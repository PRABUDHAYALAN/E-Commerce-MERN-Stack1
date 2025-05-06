import { Link } from 'react-router-dom';  // <--- Import Link here
import './Sidebar.css';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg'; // Assuming you have a different icon for listing products

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt='' />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{ textDecoration: 'none' }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt='' />
          <p>List Product</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
