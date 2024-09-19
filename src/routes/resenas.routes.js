// src/routes/resenas.routes.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('resenas');
});

router.post('/submit', (req, res) => {
    // Here you would typically save the review to a database
    // For now, we'll just send a success message
    const { productName, rating, reviewText } = req.body;
    console.log('Review submitted:', { productName, rating, reviewText });
    res.json({ message: 'Review submitted successfully!' });
});

export default router;