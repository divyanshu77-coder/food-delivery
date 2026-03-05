import React, { useEffect, useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import FoodForm from '../components/FoodForm';
import '../css/FoodsPage.css';

const FoodsPage = () => {
  const { admin, api } = useAdminAuth();
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFoods = async () => {
    try {
      const { data } = await api.get('/foods', {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      setFoods(data.foods);
    } catch (error) {
      // could add toast
    }
  };

  useEffect(() => {
    fetchFoods();
    
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (selectedFood) {
        await api.put(`/foods/${selectedFood._id}`, formData, {
          headers: {
            Authorization: `Bearer ${admin.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await api.post('/foods', formData, {
          headers: {
            Authorization: `Bearer ${admin.token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setSelectedFood(null);
      await fetchFoods();
    } catch (error) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this food?')) return;
    try {
      await api.delete(`/foods/${id}`, {
        headers: { Authorization: `Bearer ${admin.token}` }
      });
      await fetchFoods();
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="admin-foods-page">
      <section className="admin-foods-form-section">
        <h2>{selectedFood ? 'Edit Food' : 'Add Food'}</h2>
        <FoodForm
          onSubmit={handleSubmit}
          selectedFood={selectedFood}
          loading={loading}
        />
      </section>
      <section className="admin-foods-list-section">
        <h2>All Foods</h2>
        <div className="admin-foods-list">
          {foods.map((food) => (
            <div key={food._id} className="admin-food-card">
              <img src={food.image} alt={food.name} />
              <div className="admin-food-info">
                <h3>{food.name}</h3>
                <span>${food.price.toFixed(2)}</span>
                <span className="admin-food-category">{food.category}</span>
              </div>
              <div className="admin-food-actions">
                <button
                  type="button"
                  onClick={() => setSelectedFood(food)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => handleDelete(food._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FoodsPage;

