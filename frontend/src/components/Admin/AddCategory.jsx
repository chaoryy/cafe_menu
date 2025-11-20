import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function AddCategory() {
  const [formData, setFormData] = useState({
    name_ru: "",
    name_en: "",
    image_url: "",
    sort_order: 0,
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post(
        `${API_URL}/api/admin/categories`,
        formData
      );

      setMessage({
        type: "success",
        text: "Категория успешно добавлена!",
      });

      // Очищаем форму
      setFormData({
        name_ru: "",
        name_en: "",
        image_url: "",
        sort_order: 0,
      });
    } catch (error) {
      console.error("Ошибка добавления категории:", error);
      setMessage({
        type: "error",
        text: "Ошибка при добавлении категории",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-row">
          <div className="form-field">
            <label>Название (Русский):</label>
            <input
              type="text"
              name="name_ru"
              value={formData.name_ru}
              onChange={handleChange}
              placeholder="Например: Кофе"
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
              placeholder="For example: Coffee"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Имя файла картинки:</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="coffee.jpg"
              required
            />
            <small
              style={{ color: "#666", fontSize: "0.85rem", marginTop: "5px" }}
            >
              Файл должен быть в папке backend/uploads/categories/
            </small>
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
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Добавление..." : "✓ Добавить категорию"}
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

export default AddCategory;
