import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AccountSettings.css';

const AccountSettings = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('https://e-commerce-mern-stack1.onrender.com/api/user/profile', {
          headers: {
            'auth-token': token
          }
        });

        if (response.data.success) {
          setUserData({
            name: response.data.user.name,
            email: response.data.user.email,
            password: '',
            profileImage: response.data.user.profileImage || ''
          });
          setPreviewImage(response.data.user.profileImage || '');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch profile');
        if (error.response?.status === 401) {
          localStorage.removeItem('auth-token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('name', userData.name);
      if (userData.password) formData.append('password', userData.password);
      if (selectedImage) formData.append('profileImage', selectedImage);

      const response = await axios.put('https://e-commerce-mern-stack1.onrender.com/api/user/profile', formData, {
        headers: {
          'auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setUserData(prev => ({
          ...prev,
          password: '',
          profileImage: response.data.user.profileImage || prev.profileImage
        }));
        setPreviewImage(response.data.user.profileImage || '');
        setEditMode(false);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      if (error.response?.status === 401) {
        localStorage.removeItem('auth-token');
        navigate('/login');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="account-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="account-settings-container">
      <div className="account-header">
        <h2>My Account</h2>
        {!editMode && (
          <button 
            className="edit-profile-btn"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="account-content">
        <div className="profile-section">
          <div className="profile-image-container">
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile" 
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
            
            {editMode && (
              <div className="image-upload-container">
                <label htmlFor="profileImage" className="upload-btn">
                  <i className="fas fa-camera"></i> Change Photo
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>

          {editMode ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Leave blank to keep current"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setEditMode(false);
                    setPreviewImage(userData.profileImage || '');
                    setSelectedImage(null);
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value1">{userData.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;