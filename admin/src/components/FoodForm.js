import React, { useEffect, useState } from 'react';
import '../css/FoodForm.css';

const initialState = {
  name: '',
  description: '',
  price: '',
  category: ''
};

const FoodForm = ({ onSubmit, selectedFood, loading }) => {
  const [form, setForm] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (selectedFood) {
      setForm({
        name: selectedFood.name,
        description: selectedFood.description,
        price: selectedFood.price,
        category: selectedFood.category
      });
      setPreview(selectedFood.image);
    } else {
      setForm(initialState);
      setPreview('');
      setImageFile(null);
    }
  }, [selectedFood]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSubmit(formData);
  };

  return (
    <form className="food-form" onSubmit={handleSubmit}>
      <div className="food-form-grid">
        <div className="food-form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="food-form-field">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="food-form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="food-form-grid">
        <div className="food-form-field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="food-form-field">
          <label htmlFor="image">Image</label>
          <input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>
      {preview && (
        <div className="food-form-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}
      <button type="submit" className="food-form-submit" disabled={loading}>
        {loading ? 'Saving...' : selectedFood ? 'Update Food' : 'Add Food'}
      </button>
    </form>
  );
};

export default FoodForm;

