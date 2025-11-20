import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCategory from "./AddCategory";
import AddItem from "./AddItem";
import "../../styles/AdminPanel.css";

function AdminPanel() {
  const navigate = useNavigate();

  // Проверка авторизации при загрузке компонента
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (isAdmin !== "true") {
      // Если не авторизован - перенаправляем на страницу входа
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Удаляем статус авторизации
    localStorage.removeItem("isAdmin");
    // Переходим на главную
    navigate("/");
  };

  return (
    <div className="container">
      <div className="admin-header">
        <h1>⚙️ Админ-панель</h1>
        <button className="logout-button" onClick={handleLogout}>
          Выйти
        </button>
      </div>

      <div className="admin-content">
        <section className="admin-section">
          <h2>➕ Добавить категорию</h2>
          <AddCategory />
        </section>

        <section className="admin-section">
          <h2>➕ Добавить позицию меню</h2>
          <AddItem />
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;
