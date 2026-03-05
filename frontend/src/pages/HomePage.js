import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import '../css/HomePage.css';

const HomePage = () => {
  const { api } = useAuth();
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const params = { page, limit: 100 };
      if (category) params.category = category;
      if (search) params.search = search;
      const { data } = await api.get('/foods', { params });
      setFoods(data.foods);
      setPages(data.pages);
      const uniqueCategories = Array.from(new Set(data.foods.map((f) => f.category)));
      setCategories(uniqueCategories);
    } catch (error) {
      setToast({ message: 'Failed to load foods', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  
  }, [page, category, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFoods();
  };

  const handleAddToCart = (food) => {
    addToCart(food);
    setToast({ message: 'Added to cart', type: 'success' });
  };

  return (
    <main className="home">
      <section className="home-hero">
        <h1>Delicious food delivered to you</h1>
        <p>Browse our menu, customize your cart, and checkout securely.</p>
      </section>

      <section className="home-filters">
        <form className="home-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="home-category">
          <button
            type="button"
            className={!category ? 'active' : ''}
            onClick={() => {
              setCategory('');
              setPage(1);
              fetchFoods();
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={category === cat ? 'active' : ''}
              onClick={() => {
                setCategory(cat);
                setPage(1);
                fetchFoods();
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="home-grid">
        {loading ? (
          <Loader />
        ) : foods.length === 0 ? (
          <p>No foods found.</p>
        ) : (
          <div className="home-grid-inner">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} onAdd={handleAddToCart} />
            ))}
          </div>
        )}
      </section>

      <section className="home-pagination">
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            className={p === page ? 'active' : ''}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </section>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </main>
  );
};

export default HomePage;

