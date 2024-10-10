// src/routes/favoritos.routes.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Obtener todos los favoritos
router.get('/', async (req, res) => {
    const [favorites] = await pool.query('SELECT p.* FROM favorites f JOIN products p ON f.product_id = p.id');
    res.render('favoritos', { favorites });
});

// Agregar/Quitar de favoritos
router.post('/toggle-favorite', async (req, res) => {
    const { productId } = req.body;
    const [rows] = await pool.query('SELECT * FROM favorites WHERE product_id = ?', [productId]);

    if (rows.length > 0) {
        // Eliminar de favoritos
        await pool.query('DELETE FROM favorites WHERE product_id = ?', [productId]);
    } else {
        // Agregar a favoritos
        await pool.query('INSERT INTO favorites (product_id) VALUES (?)', [productId]);
    }

    res.redirect('/favoritos');
});

export default router;
