import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminLogin.css";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ADMIN_PASSWORD = "admin123"; // Можно вынести в .env

    if (password === ADMIN_PASSWORD) {
      // Сохраняем статус входа
      localStorage.setItem("isAdmin", "true");
      // Переходим в админку
      navigate("/admin/panel");
    } else {
      setError("Неверный пароль!");
      setPassword(""); // Очищаем поле
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Вход в админ-панель</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="submit" className="login-button">
              Войти
            </button>
            <button type="button" className="cancel-button" onClick={goBack}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
