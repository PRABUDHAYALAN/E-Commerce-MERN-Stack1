import React from 'react'
import './NewCollections.css'
import { useEffect, useState } from 'react'
import Item from '../Item/Item'

const NewCollections = () => {
  const [new_collection, setNew_Collection] = useState([]);

  useEffect(() => {
    fetch('https://e-commerce-mern-stack1.onrender.com/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_Collection(data));
  }, []);
  
  return (
    <div className='new-collection'>
        <h1>NEW COLLECTIONS</h1>
        <p className="collection-desc">
          Discover the latest trends handpicked for you – shop now before they're gone!
        </p>
        <hr/>
        <div className='collections'>
            {new_collection.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default NewCollections
