import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className='newsletter-input'>
        <input type='email' placeholder='Your Email ID' />
        <button>Email</button>
      </div>
    </div>
  )
}

export default NewsLetter
