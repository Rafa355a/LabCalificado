// src/routes/favoritos.routes.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('favoritos');
});

router.post('/toggle', (req, res) => {
    // Here you would typically toggle the favorite status in a database
    // For now, we'll just send a success message
    const { productId } = req.body;
    console.log('Toggling favorite for product:', productId);
    res.json({ message: 'Favorite status toggled!' });
});

export default router;