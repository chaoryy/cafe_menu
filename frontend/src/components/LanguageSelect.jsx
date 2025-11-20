import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/LanguageSelect.css';
import uk from '../Images/Flags/uk.jpg';
import russia from "../Images/Flags/russia.jpg";
import logo from '../Images/logo.png'

function LanguageSelect() {
    const navigate = useNavigate();

    const selectLanguage = (lang) => {
        localStorage.setItem('language', lang);
        navigate('/categories');
    };

    const img = {
        'uk.png': uk,
        'russia.png': russia,
        'logo.png' : logo,
    }

    return (
      <div className="language-select-container">
        <div className="language-select-content">
          <h1>Welcome to the</h1>
          <img className="logo" src={logo} alt="" />
          <p>Select language:</p>
          <div className="language-buttons">
            <button
              className="language-button"
              onClick={() => selectLanguage("ru")}
            >
              <img className="flag" src={russia} alt="russian flag" />
              <span>Русский</span>
            </button>

            <button
              className="language-button"
              onClick={() => selectLanguage("en")}
            >
              <img className="flag" src={uk} alt="uk flag" />
              <span>English</span>
            </button>

            <button className="admin-link" onClick={() => navigate("/admin")}>
              Админ
            </button>
          </div>
        </div>
      </div>
    );
}

export default LanguageSelect;