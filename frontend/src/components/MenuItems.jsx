import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function MenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const language = localStorage.getItem("language") || "ru";

  useEffect(() => {
    fetchItems();
  }, [categoryId]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/items/${categoryId}?lang=${language}`
      );
      setItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка загрузки позиций:", err);
      setError("Не удалось загрузить позиции меню");
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate("/categories");
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h1>{language === "ru" ? " Позиции меню" : " Menu Items"}</h1>
        <button className="back-button" onClick={goBack}>
          {language === "ru" ? "← Назад" : "← Back"}
        </button>
      </div>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img
              src={`${API_URL}/uploads/items/${item.image_url}`}
              alt={item.name}
              className="card-image"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x400?text=No+Image";
              }}
            />
            <div className="card-content">
              <h2 className="card-title">{item.name}</h2>
              <p className="card-description">{item.description}</p>
              <p className="card-price">{item.price} ₽</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;
