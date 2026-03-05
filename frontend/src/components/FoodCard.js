import React from 'react';
import '../css/FoodCard.css';

const FoodCard = ({ food, onAdd }) => {
  return (
    <div className="food-card">
      <div className="food-card-image-wrapper">
        <img src={`http://localhost:5000${food.image}`} alt={food.name} className="food-card-image" />
      </div>
      <div className="food-card-body">
        <h3 className="food-card-title">{food.name}</h3>
        <p className="food-card-description">{food.description}</p>
        <div className="food-card-footer">
          <span className="food-card-price">${food.price.toFixed(2)}</span>
          <button
            type="button"
            className="food-card-btn"
            onClick={() => onAdd(food)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

