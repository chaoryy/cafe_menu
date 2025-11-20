import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function AddItem() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    name_ru: "",
    name_en: "",
    description_ru: "",
    description_en: "",
    price: "",
    image_url: "",
    sort_order: 0,
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // Загружаем категории при монтировании компонента
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories?lang=ru`);
      setCategories(response.data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(`${API_URL}/api/admin/items`, formData);

      setMessage({
        type: "success",
        text: "Позиция успешно добавлена!",
      });

      // Очищаем форму (кроме category_id)
      setFormData((prev) => ({
        category_id: prev.category_id,
        name_ru: "",
        name_en: "",
        description_ru: "",
        description_en: "",
        price: "",
        image_url: "",
        sort_order: 0,
      }));
    } catch (error) {
      console.error("Ошибка добавления позиции:", error);
      setMessage({
        type: "error",
        text: "Ошибка при добавлении позиции",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-field">
          <label>Категория:</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Название (Русский):</label>
            <input
              type="text"
              name="name_ru"
              value={formData.name_ru}
              onChange={handleChange}
              placeholder="Например: Капучино"
              required
            />
          </div>

          <div className="form-field">
            <label>Название (English):</label>
            <input
              type="text"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              placeholder="For example: Cappuccino"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Описание (Русский):</label>
            <textarea
              name="description_ru"
              value={formData.description_ru}
              onChange={handleChange}
              placeholder="Эспрессо с молоком и пеной"
            />
          </div>

          <div className="form-field">
            <label>Описание (English):</label>
            <textarea
              name="description_en"
              value={formData.description_en}
              onChange={handleChange}
              placeholder="Espresso with milk and foam"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Цена (сом):</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="250.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-field">
            <label>Имя файла картинки:</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="cappuccino.jpg"
              required
            />
            <small
              style={{ color: "#666", fontSize: "0.85rem", marginTop: "5px" }}
            >
              Файл должен быть в папке backend/uploads/items/
            </small>
          </div>
        </div>

        <div className="form-field">
          <label>Порядок сортировки:</label>
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order}
            onChange={handleChange}
            min="0"
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Добавление..." : "✓ Добавить позицию"}
        </button>

        {message.text && (
          <div
            className={
              message.type === "success"
                ? "success-message"
                : "error-message-admin"
            }
          >
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddItem;
