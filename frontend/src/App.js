import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelect from "./components/LanguageSelect";
import Categories from "./components/Categories";
import MenuItems from "./components/MenuItems";
import AdminPanel from "./components/Admin/AdminPanel.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LanguageSelect />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/items/:categoryId" element={<MenuItems />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
