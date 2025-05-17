import React, { useEffect, useState } from 'react';
import './RelatedProduct.css';
import Item from '../Item/Item';

const RelatedProducts = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await fetch('https://e-commerce-mern-stack1.onrender.com/newcollections');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNewCollections(data);
      } catch (error) {
        console.error('Error fetching new collections:', error);
      }
    };

    fetchNewCollections();
  }, []);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {newCollections.length > 0 ? (
          newCollections.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>Loading related products...</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
