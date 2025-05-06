import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setError('Please select an image file (jpg, png, jpeg)');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      setError(null);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    // Special handling for price fields
    if (name === 'new_price' || name === 'old_price') {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setProductDetails({ ...productDetails, [name]: value });
      }
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const validateForm = () => {
    if (!productDetails.name.trim()) {
      setError('Product name is required');
      return false;
    }
    if (!productDetails.old_price || !productDetails.new_price) {
      setError('Both prices are required');
      return false;
    }
    if (parseFloat(productDetails.new_price) >= parseFloat(productDetails.old_price)) {
      setError('Offer price should be less than original price');
      return false;
    }
    if (!image) {
      setError('Product image is required');
      return false;
    }
    setError(null);
    return true;
  };

  const addProduct = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Upload image
      const formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch("https://e-commerce-mern-stack1.onrender.com/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed with status: ' + uploadResponse.status);
      }

      const responseData = await uploadResponse.json();

      if (!responseData.success || !responseData.image_url) {
        throw new Error('Image upload failed: ' + (responseData.message || 'No image URL returned'));
      }

      // Prepare product data
      const productData = {
        name: productDetails.name,
        image: responseData.image_url,
        category: productDetails.category,
        new_price: parseFloat(productDetails.new_price),
        old_price: parseFloat(productDetails.old_price),
      };

      // Add product
      const addResponse = await fetch("https://e-commerce-mern-stack1.onrender.com/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!addResponse.ok) {
        throw new Error('Failed to add product with status: ' + addResponse.status);
      }

      const addData = await addResponse.json();
      if (!addData.success) {
        throw new Error(addData.message || 'Failed to add product');
      }

      alert("Product Added Successfully!");
      resetForm();
    } catch (error) {
      console.error("Add product error:", error);
      setError(error.message || "Something went wrong while adding the product!");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setProductDetails({
      name: "",
      image: "",
      category: "women",
      new_price: "",
      old_price: "",
    });
    setImage(null);
    setError(null);
  };

  return (
    <div className='add-product'>
      <h2>Add New Product</h2>
      
      {error && <div className="error-message">{error}</div>}

      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="addproduct-price-container">
        <div className="addproduct-itemfield">
          <p>Original Price (₹)</p>
          <input
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            placeholder="0.00"
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price (₹)</p>
          <input
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
          className='add-product-selector'
          required
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className='addproduct-thumnail-img'
            alt='Upload Thumbnail'
          />
          <p>{image ? image.name : "Click to upload image (max 5MB)"}</p>
        </label>
        <input
          onChange={imageHandler}
          type='file'
          name='image'
          id='file-input'
          accept="image/*"
          hidden
          required
        />
      </div>

      <button 
        onClick={addProduct} 
        className='addproduct-btn'
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'ADD PRODUCT'}
      </button>
    </div>
  );
};

export default AddProduct;