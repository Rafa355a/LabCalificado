// src/index.js
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import resenasRoutes from './routes/resenas.routes.js';
import favoritosRoutes from './routes/favoritos.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set up Handlebars as the template engine
const hbs = engine({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: {
        isFavorite: (productId, favorites) => {
            return favorites.some(f => f.id === productId);
        }
    }
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mock database for reviews and favorites
let reviews = [];
let favorites = [];

// Mock product list
const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción del Producto 1' },
    { id: 2, name: 'Producto 2', description: 'Descripción del Producto 2' },
    { id: 3, name: 'Producto 3', description: 'Descripción del Producto 3' },
    { id: 4, name: 'Producto 4', description: 'Descripción del Producto 4' },
    { id: 5, name: 'Producto 5', description: 'Descripción del Producto 5' },
];

// Routes
app.get('/', (req, res) => {
    res.render('home', { reviews, favorites });
});

app.use('/resenas', resenasRoutes);

// Favorites routes
app.get('/favoritos', (req, res) => {
    res.render('favoritos', { products, favorites });
});

app.post('/toggle-favorite', (req, res) => {
    const { productId } = req.body;
    const index = favorites.findIndex(f => f.id === parseInt(productId));
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            favorites.push(product);
        }
    }
    res.redirect('/favoritos');
});

// Review submission route
app.post('/submit-review', (req, res) => {
    const { reviewerName, productName, rating, reviewText } = req.body;
    reviews.push({ reviewerName, productName, rating, reviewText });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});