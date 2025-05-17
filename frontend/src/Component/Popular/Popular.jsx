
import './Popular.css'
import React, {useEffect, useState} from 'react'
import Item from '../Item/Item.jsx'

const Popular = () => {
    const [popularProduct,setPopularProduct] = useState([]);

    useEffect(() => {
      fetch('https://e-commerce-mern-stack1.onrender.com/popularinwomen')
      .then((response)=>response.json())
      .then((data)=>setPopularProduct(data));
    },[])
  
  return (
    <div className='popular'>
    <h1>POPULAR IN WOMEN</h1>
    <p className='popular-subtext'>Explore our top-selling fashion pieces, handpicked for modern women who love to stand out.</p>
    <hr />
    <div className='popular-items'>
      {popularProduct.map((item, i) => (
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
  </div>
  )
};
export default Popular