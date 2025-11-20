import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const language = localStorage.getItem("language") || "ru";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/categories?lang=${language}`
      );
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка загрузки категорий:", err);
      setError("Не удалось загрузить категории");
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/items/${categoryId}`);
  };

  const goBack = () => {
    navigate("/");
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>{language === "ru" ? "☕ Меню" : "☕ Menu"}</h1>
        <button className="back-button" onClick={goBack}>
          {language === "ru" ? "← Назад" : "← Back"}
        </button>
      </div>

      <div className="grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <img
              src={`${API_URL}/uploads/categories/${category.image_url}`}
              alt={category.name}
              className="card-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
            <div className="card-content">
              <h2 className="card-title">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
