require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); // Разрешаем запросы с frontend
app.use(express.json()); // Парсим JSON из запросов
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Раздаем картинки

app.get('/api/categories', (req, res) => {
    const lang = req.query.lang || 'ru'; // язык из параметра ?lang=ru

    const query = `
    SELECT 
      c.id, 
      c.image_url, 
      ct.name,
      c.sort_order
    FROM categories c
    JOIN category_translations ct ON c.id = ct.category_id
    JOIN languages l ON ct.language_id = l.id
    WHERE l.code = ?
    ORDER BY c.sort_order
  `;

    db.query(query, [lang], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Ошибка получения категорий' });
        }
        res.json(results);
    });
});

app.get('/api/items/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    const lang = req.query.lang || 'ru';

    const query = `
    SELECT
      mi.id,
      mi.price,
      mi.image_url,
      mi.is_available,
      it.name,
      it.description
    FROM menu_items mi
    JOIN item_translations it ON mi.id = it.item_id
    JOIN languages l ON it.language_id = l.id
    WHERE mi.category_id = ? AND l.code = ?
    ORDER BY mi.sort_order
  `;

    db.query(query, [categoryId, lang], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Ошибка получения позиций' });
        }
        res.json(results);
    });
});

app.post('/api/admin/categories', (req, res) => {
    const { name_ru, name_en, image_url, sort_order } = req.body;

    db.query(
        'INSERT INTO categories (image_url, sort_order) VALUES (?, ?)',
        [image_url, sort_order || 0],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка создания категории' });
            }

            const categoryId = result.insertId;

            // Теперь добавляем переводы
            const translations = [
                [categoryId, 1, name_ru], // language_id=1 это русский
                [categoryId, 2, name_en]  // language_id=2 это английский
            ];

            db.query(
                'INSERT INTO category_translations (category_id, language_id, name) VALUES ?',
                [translations],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Ошибка добавления переводов' });
                    }
                    res.json({ id: categoryId, message: 'Категория добавлена' });
                }
            );
        }
    );
});

app.delete('/api/admin/categories/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM categories WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Ошибка удаления' });
        }
        res.json({ message: 'Категория удалена' });
    });
});

app.post('/api/admin/items', (req, res) => {
    const {
        category_id,
        name_ru,
        name_en,
        description_ru,
        description_en,
        price,
        image_url,
        sort_order
    } = req.body;

    // Создаем позицию
    db.query(
        'INSERT INTO menu_items (category_id, price, image_url, sort_order) VALUES (?, ?, ?, ?)',
        [category_id, price, image_url, sort_order || 0],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Ошибка создания позиции' });
            }

            const itemId = result.insertId;

            const translations = [
                [itemId, 1, name_ru, description_ru],
                [itemId, 2, name_en, description_en]
            ];

            db.query(
                'INSERT INTO item_translations (item_id, language_id, name, description) VALUES ?',
                [translations],
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Ошибка добавления переводов' });
                    }
                    res.json({ id: itemId, message: 'Позиция добавлена' });
                }
            );
        }
    );
});


app.delete('/api/admin/items/:id', (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM menu_items WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Ошибка удаления' });
        }
        res.json({ message: 'Позиция удалена' });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
