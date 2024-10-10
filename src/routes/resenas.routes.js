// src/routes/resenas.routes.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Obtener todas las reseñas
router.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM reviews');
    res.render('resenas', { reviews: rows });
});

// Enviar una nueva reseña
router.post('/submit', async (req, res) => {
    const { reviewerName, productName, rating, reviewText } = req.body;
    await pool.query(
        'INSERT INTO reviews (reviewer_name, product_name, rating, review_text) VALUES (?, ?, ?, ?)',
        [reviewerName, productName, rating, reviewText]
    );
    res.redirect('/resenas');
});

// Obtener una reseña específica para editar
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ?', [id]);
    res.render('editReview', { review: rows[0] });
});

// Actualizar una reseña
router.post('/update', async (req, res) => {
    const { id, reviewerName, productName, rating, reviewText } = req.body;
    await pool.query(
        'UPDATE reviews SET reviewer_name = ?, product_name = ?, rating = ?, review_text = ? WHERE id = ?',
        [reviewerName, productName, rating, reviewText, id]
    );
    res.redirect('/resenas');
});

// Eliminar una reseña
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
    res.redirect('/');
});

export default router;
