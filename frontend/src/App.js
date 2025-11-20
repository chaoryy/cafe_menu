import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelect from "./components/LanguageSelect";
import Categories from "./components/Categories";
import MenuItems from "./components/MenuItems";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPanel from "./components/Admin/AdminPanel";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LanguageSelect />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/items/:categoryId" element={<MenuItems />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
